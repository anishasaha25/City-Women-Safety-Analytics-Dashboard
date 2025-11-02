import { type NextRequest, NextResponse } from "next/server"
import { findAlert, updateAlert } from "@/lib/alerts-store"

// Helper function to create notifications (local fetch to POST /api/notifications)
async function createNotification(userId: string, alertId: string, type: string, title: string, message: string) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`
    const url = new URL('/api/notifications', base).toString()
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, alertId, type, title, message }),
    })
    return response.json()
  } catch (error) {
    console.error('Failed to create notification:', error)
    return null
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    // Defensive: ensure body is valid JSON
    let body: any = {}
    try {
      body = await request.json()
    } catch (e) {
      console.error('PATCH /api/alerts/[id] - invalid JSON body', e)
      return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
    }
    const { status } = body || {}

    if (!status || !["New", "Responding", "Resolved"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status. Must be: New, Responding, or Resolved" },
        { status: 400 },
      )
    }

    console.log(`PATCH /api/alerts/${id} request, status=${status}`)
    // Find and update alert from shared store
    const existing = findAlert(id)
    if (!existing) {
      return NextResponse.json({ success: false, error: "Alert not found" }, { status: 404 })
    }

    const previousStatus = existing.status
  updateAlert(id, { status, updatedAt: new Date().toISOString() })

    const updated = findAlert(id)!

    // Send notification to user when status changes to "Responding"
    if (status === "Responding" && previousStatus !== "Responding") {
      await createNotification(
        updated.userId,
        updated.id,
        "status_update",
        "Police Response Dispatched! 🚨",
        `Police from ${updated.nearestStation} are on their way to your location. Stay safe and stay where you are if possible.`
      )
    }

    // Send notification when resolved
    if (status === "Resolved" && previousStatus !== "Resolved") {
      await createNotification(
        updated.userId,
        updated.id,
        "status_update",
        "Alert Resolved ✅",
        `Your emergency alert has been resolved by ${updated.nearestStation}. We hope you are safe. If you need further assistance, please contact us.`
      )
    }

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Alert status updated successfully",
    })
  } catch (err) {
    console.error('PATCH /api/alerts/[id] - unexpected error', err)
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ success: false, error: `Failed to update alert: ${message}` }, { status: 500 })
  }
}

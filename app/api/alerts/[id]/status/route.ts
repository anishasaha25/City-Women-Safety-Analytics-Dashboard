import { type NextRequest, NextResponse } from "next/server"
import { findAlert } from "@/lib/alerts-store"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

  const alert = findAlert(id)
    if (!alert) {
      return NextResponse.json({ success: false, error: "Alert not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: alert.id,
        status: alert.status,
        timestamp: alert.timestamp,
        updatedAt: alert.updatedAt || alert.timestamp,
      },
    })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch alert status" }, { status: 500 })
  }
}

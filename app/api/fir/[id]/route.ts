import { type NextRequest, NextResponse } from "next/server"
import { getFIRById, updateFIRStatus } from "@/lib/alerts-store"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const fir = getFIRById(params.id)
    if (!fir) {
      return NextResponse.json({ success: false, error: "FIR not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: fir })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch FIR" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json({ success: false, error: "Status is required" }, { status: 400 })
    }

    const fir = updateFIRStatus(params.id, status)
    if (!fir) {
      return NextResponse.json({ success: false, error: "FIR not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: fir })
  } catch (error) {
    console.error("FIR status update error:", error)
    return NextResponse.json({ success: false, error: "Failed to update FIR status" }, { status: 500 })
  }
}

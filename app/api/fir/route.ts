import { type NextRequest, NextResponse } from "next/server"
import { addFIR, getActiveFIRs } from "@/lib/alerts-store"

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: getActiveFIRs() })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch FIRs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, name, phone, email, category, description, incidentLocation, incidentDate, lat, lng, preferredStation } = body

    if (!userId || !name || !phone || !category || !description || !incidentLocation || !incidentDate || lat === undefined || lng === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      )
    }

    const newFIR = addFIR({
      userId,
      name,
      phone,
      email,
      category,
      description,
      incidentLocation,
      incidentDate,
      lat: Number.parseFloat(String(lat)),
      lng: Number.parseFloat(String(lng)),
      preferredStation,
      status: "New",
      timestamp: new Date().toISOString(),
    })

    console.log("New FIR registered:", newFIR)

    return NextResponse.json({
      success: true,
      data: newFIR,
      message: "FIR registered successfully and forwarded to police station",
    })
  } catch (error) {
    console.error("FIR registration error:", error)
    return NextResponse.json({ success: false, error: "Failed to register FIR" }, { status: 500 })
  }
}

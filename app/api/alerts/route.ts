import { type NextRequest, NextResponse } from "next/server"
import { addAlert, getActiveAlerts } from "@/lib/alerts-store"


export async function GET() {
  try {
    return NextResponse.json({ success: true, data: getActiveAlerts() })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch alerts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, lat, lng, type } = body

    if (!userId || !lat || !lng || !type) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: userId, lat, lng, type" },
        { status: 400 },
      )
    }

    // Find nearest police station (simplified logic)
    const nearestStation = findNearestPoliceStation(lat, lng)

    const newAlert = addAlert({
      userId,
      lat: Number.parseFloat(lat),
      lng: Number.parseFloat(lng),
      type,
      nearestStation,
      status: "New",
      timestamp: new Date().toISOString(),
    })

    // In production, broadcast via Socket.IO here
    console.log("New alert created:", newAlert)

    return NextResponse.json({
      success: true,
      data: newAlert,
      message: "Alert created successfully",
    })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create alert" }, { status: 500 })
  }
}

function findNearestPoliceStation(lat: number, lng: number): string {
  const policeStations = [
    { name: "T Nagar Police Station", lat: 13.0415, lng: 80.2345 },
    { name: "Mylapore Police Station", lat: 13.0324, lng: 80.2702 },
    { name: "Adyar Police Station", lat: 13.0065, lng: 80.2553 },
    { name: "Marina Police Station", lat: 13.05, lng: 80.2824 },
    { name: "Egmore Police Station", lat: 13.0732, lng: 80.2609 },
  ]

  let nearest = policeStations[0]
  let minDistance = calculateDistance(lat, lng, nearest.lat, nearest.lng)

  for (const station of policeStations) {
    const distance = calculateDistance(lat, lng, station.lat, station.lng)
    if (distance < minDistance) {
      minDistance = distance
      nearest = station
    }
  }

  return nearest.name
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

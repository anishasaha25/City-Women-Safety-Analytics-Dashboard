import { NextResponse } from "next/server"

const policeStations = [
  { name: "T Nagar Police Station", lat: 13.0415, lng: 80.2345 },
  { name: "Mylapore Police Station", lat: 13.0324, lng: 80.2702 },
  { name: "Adyar Police Station", lat: 13.0065, lng: 80.2553 },
  { name: "Marina Police Station", lat: 13.05, lng: 80.2824 },
  { name: "Egmore Police Station", lat: 13.0732, lng: 80.2609 },
  { name: "Anna Nagar Police Station", lat: 13.085, lng: 80.2101 },
  { name: "Kilpauk Police Station", lat: 13.0781, lng: 80.2378 },
  { name: "Thousand Lights Police Station", lat: 13.0569, lng: 80.2378 },
  { name: "Teynampet Police Station", lat: 13.0389, lng: 80.2378 },
  { name: "Royapettah Police Station", lat: 13.0569, lng: 80.2609 },
  { name: "Guindy Police Station", lat: 12.9716, lng: 80.2378 },
  { name: "Velachery Police Station", lat: 12.9716, lng: 80.22 },
  { name: "Tambaram Police Station", lat: 12.9249, lng: 80.1 },
  { name: "Chromepet Police Station", lat: 12.9516, lng: 80.1378 },
  { name: "Pallavaram Police Station", lat: 12.9675, lng: 80.1491 },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: policeStations,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch police stations" }, { status: 500 })
  }
}

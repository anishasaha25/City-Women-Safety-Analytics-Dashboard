import { NextResponse } from "next/server"

const cctvLocations = [
  {
    id: "cctv_001",
    name: "Marina Beach Junction",
    lat: 13.05,
    lng: 80.2824,
    feedUrl: "/videos/marina-beach.mp4",
    status: "active",
  },
  {
    id: "cctv_002",
    name: "T Nagar Bus Stand",
    lat: 13.0415,
    lng: 80.2345,
    feedUrl: "/videos/tnagar-busstand.mp4",
    status: "active",
  },
  {
    id: "cctv_003",
    name: "Mylapore Temple",
    lat: 13.0324,
    lng: 80.2702,
    feedUrl: "/videos/mylapore-temple.mp4",
    status: "active",
  },
  {
    id: "cctv_004",
    name: "Adyar Signal",
    lat: 13.0065,
    lng: 80.2553,
    feedUrl: "/videos/adyar-signal.mp4",
    status: "active",
  },
  {
    id: "cctv_005",
    name: "Anna Nagar Tower",
    lat: 13.085,
    lng: 80.2101,
    feedUrl: "/videos/anna-nagar.mp4",
    status: "active",
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: cctvLocations,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch CCTV locations" }, { status: 500 })
  }
}

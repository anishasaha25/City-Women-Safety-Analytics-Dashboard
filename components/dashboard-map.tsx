"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface Alert {
  id: string
  userId: string
  lat: number
  lng: number
  type: string
  nearestStation: string
  status: "New" | "Responding" | "Resolved"
  timestamp: string
}

interface DashboardMapProps {
  alerts: Alert[]
  onAlertSelect: (alert: Alert) => void
  selectedAlert: Alert | null
}

export default function DashboardMap({ alerts, onAlertSelect, selectedAlert }: DashboardMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.LayerGroup>(new L.LayerGroup())

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map centered on Chennai
    const map = L.map(mapRef.current).setView([13.0827, 80.2707], 11)

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Add police stations
    const policeStations = [
      { name: "T Nagar Police Station", lat: 13.0415, lng: 80.2345 },
      { name: "Mylapore Police Station", lat: 13.0324, lng: 80.2702 },
      { name: "Adyar Police Station", lat: 13.0065, lng: 80.2553 },
      { name: "Marina Police Station", lat: 13.05, lng: 80.2824 },
      { name: "Egmore Police Station", lat: 13.0732, lng: 80.2609 },
      { name: "Anna Nagar Police Station", lat: 13.085, lng: 80.2101 },
    ]

    // Create custom police station icon
    const policeIcon = L.divIcon({
      html: `<div style="background-color: #3b82f6; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">🚔</div>`,
      className: "custom-police-icon",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    })

    policeStations.forEach((station) => {
      L.marker([station.lat, station.lng], { icon: policeIcon })
        .addTo(map)
        .bindPopup(`<strong>${station.name}</strong><br/>Police Station`)
    })

    mapInstanceRef.current = map
    markersRef.current.addTo(map)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current) return

    // Clear existing alert markers
    markersRef.current.clearLayers()

    // Add alert markers
    alerts.forEach((alert) => {
      const isSelected = selectedAlert?.id === alert.id
      const isActive = alert.status !== "Resolved"

      // Create custom alert icon based on status
      let iconColor = "#ef4444" // red for new
      if (alert.status === "Responding") iconColor = "#f59e0b" // amber for responding
      if (alert.status === "Resolved") iconColor = "#10b981" // green for resolved

      const alertIcon = L.divIcon({
        html: `<div style="background-color: ${iconColor}; color: white; border-radius: 50%; width: ${
          isSelected ? 32 : 24
        }px; height: ${
          isSelected ? 32 : 24
        }px; display: flex; align-items: center; justify-content: center; font-size: ${
          isSelected ? 16 : 12
        }px; border: ${isSelected ? 3 : 2}px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); ${
          !isActive ? "opacity: 0.6;" : ""
        }">⚠️</div>`,
        className: "custom-alert-icon",
        iconSize: [isSelected ? 32 : 24, isSelected ? 32 : 24],
        iconAnchor: [isSelected ? 16 : 12, isSelected ? 16 : 12],
      })

      const marker = L.marker([alert.lat, alert.lng], { icon: alertIcon })
        .addTo(markersRef.current)
        .bindPopup(
          `<div>
            <strong>Alert #${alert.id}</strong><br/>
            <strong>Type:</strong> ${alert.type}<br/>
            <strong>Status:</strong> ${alert.status}<br/>
            <strong>Station:</strong> ${alert.nearestStation}<br/>
            <strong>Time:</strong> ${new Date(alert.timestamp).toLocaleString()}
          </div>`,
        )

      marker.on("click", () => {
        onAlertSelect(alert)
      })
    })
  }, [alerts, selectedAlert, onAlertSelect])

  return <div ref={mapRef} className="h-96 w-full rounded-lg" />
}

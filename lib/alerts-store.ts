// Shared in-memory alert store for demo purposes.
// In a real application replace this with a database (MongoDB/Postgres/Firebase etc.)

export interface AlertRecord {
  id: string
  userId: string
  lat: number
  lng: number
  type: string
  nearestStation: string
  status: "New" | "Responding" | "Resolved"
  timestamp: string
  updatedAt?: string
}

export interface FIRRecord {
  id: string
  userId: string
  name: string
  phone: string
  email?: string
  category: string
  description: string
  incidentLocation: string
  incidentDate: string
  lat: number
  lng: number
  preferredStation: string
  status: "New" | "Under Review" | "Registered" | "Resolved"
  timestamp: string
  updatedAt?: string
}

// Use a module-level singleton so all API route files importing this module
// see the same array instance (Node.js module cache behavior).
const alertStore: AlertRecord[] = []

// Basic id counter (not safe for concurrency, fine for demo)
let counter = 1

// Seed with one sample alert if empty (avoid duplicating on hot reload by checking length)
if (alertStore.length === 0) {
  alertStore.push({
    id: String(counter++),
    userId: "WOMEN123",
    lat: 13.0415,
    lng: 80.2345,
    type: "Harassment",
    nearestStation: "T Nagar Police Station",
    status: "New",
    timestamp: "2025-09-29T17:15:00Z",
  })
}

export function getAlerts() {
  return alertStore
}

export function nextAlertId() {
  return String(counter++)
}

export function addAlert(alert: Omit<AlertRecord, "id">): AlertRecord {
  const record: AlertRecord = { ...alert, id: nextAlertId() }
  alertStore.push(record)
  return record
}

// FIR Store (separate from real-time alerts)
const firStore: FIRRecord[] = []

export function getFIRs() {
  return firStore
}

export function getFIRById(id: string) {
  return firStore.find(fir => fir.id === id)
}

export function getActiveFIRs() {
  return firStore.filter(fir => fir.status !== "Resolved")
}

export function addFIR(fir: Omit<FIRRecord, "id">): FIRRecord {
  const record: FIRRecord = { ...fir, id: `FIR-${nextAlertId()}` }
  firStore.push(record)
  return record
}

export function updateFIRStatus(id: string, status: FIRRecord["status"]): FIRRecord | null {
  const fir = firStore.find(f => f.id === id)
  if (fir) {
    fir.status = status
    fir.updatedAt = new Date().toISOString()
  }
  return fir || null
}

export function findAlert(id: string): AlertRecord | undefined {
  return alertStore.find(a => a.id === id)
}

export function updateAlert(id: string, updates: Partial<AlertRecord>): AlertRecord | undefined {
  const alert = findAlert(id)
  if (alert) {
    Object.assign(alert, updates)
  }
  return alert
}

// Utility for filtering active (non-resolved) alerts
export function getActiveAlerts() {
  return alertStore.filter(a => a.status !== "Resolved")
}

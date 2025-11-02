"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { login as doLogin, Role } from "@/components/fake-auth"

export default function LoginPage() {
  const [regId, setRegId] = useState("")
  const [role, setRole] = useState<Role>("police")
  const router = useRouter()
  const regIdRef = useRef<HTMLInputElement | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // autofocus the registration id input when the page loads
    regIdRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!regId) {
      toast.error("Please enter your registration ID")
      return
    }

    // Simple allowlist validation (prototype)
    const allowed = ["POL-", "NGO-", "GOV-"]
    const upper = regId.trim().toUpperCase()
    const ok = allowed.some((p) => upper.startsWith(p))
    if (!ok) {
      toast.error("Registration ID not recognised. Use POL-, NGO- or GOV- prefixes for prototype")
      return
    }

    // Persist fake auth
    doLogin({ regId: regId.trim(), role })

    // show success toast and small animation before navigation
    setSuccess(true)
    toast.success("Logged in")

    // Wait briefly to show animation, then navigate
    setTimeout(async () => {
      await router.push("/dashboard")
    }, 600)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-4">
        <Card>
          <CardHeader>
            <CardTitle>Sign in to Abhaya Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="regId">Registration ID</Label>
                <Input
                  id="regId"
                  value={regId}
                  onChange={(e) => setRegId(e.target.value)}
                  placeholder="e.g. POL-12345 or NGO-001"
                  ref={regIdRef}
                />
                <p className="text-xs text-gray-500 mt-1">Use prefix POL-, NGO-, or GOV- for prototype validation.</p>
              </div>

              <div>
                <Label>Role</Label>
                <Select value={role} onValueChange={(val) => setRole(val as Role)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="police">Police Department</SelectItem>
                    <SelectItem value="ngo">Registered NGO</SelectItem>
                    <SelectItem value="gov">Government Women Safety Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" className="flex-1">Sign In</Button>
                <Button variant="outline" onClick={() => router.push("/")}>Cancel</Button>
              </div>
              {success && (
                <div className="flex items-center justify-center mt-2">
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Signed in
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

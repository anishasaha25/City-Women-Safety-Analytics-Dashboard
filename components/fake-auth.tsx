"use client"

import { useEffect, useState } from "react"

export type Role = "police" | "ngo" | "gov"

export interface AuthUser {
  regId: string
  role: Role
  name?: string
}

const STORAGE_KEY = "abhaya_user"

export function login(user: AuthUser) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    // notify others
    window.dispatchEvent(new Event("abhaya:auth_changed"))
  } catch (e) {
    console.error("login failed", e)
  }
}

export function logout() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new Event("abhaya:auth_changed"))
  } catch (e) {
    console.error("logout failed", e)
  }
}

export function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthUser
  } catch (e) {
    console.error("getUser failed", e)
    return null
  }
}

export function useAuth() {
  // Initialize synchronously from localStorage to avoid redirect race conditions
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      return getUser()
    } catch {
      return null
    }
  })

  useEffect(() => {
    const handler = () => setUser(getUser())
    window.addEventListener("abhaya:auth_changed", handler)
    return () => window.removeEventListener("abhaya:auth_changed", handler)
  }, [])

  return {
    user,
    login,
    logout,
  }
}

export default useAuth

"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { authService } from "@/services/auth-service"

interface User {
  id: number
  name: string
  email: string
  role: "admin" | "alumni"
  verified: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  hasRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        const userData = JSON.parse(localStorage.getItem("user") || "{}")
        setUser(userData)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password)

      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      setUser(response.user)

      toast({
        title: "Login successful",
        description: `Welcome back, ${response.user.name}!`,
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      })
      throw error
    }
  }

  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      await authService.register(name, email, password, role)

      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account.",
      })

      router.push("/auth/login")
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Registration failed",
        variant: "destructive",
      })
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  const isAuthenticated = !!user
  const hasRole = (role: string) => user?.role === role

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

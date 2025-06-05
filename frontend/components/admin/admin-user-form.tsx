"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { User, Mail, Shield, CheckCircle } from "lucide-react"

export default function AdminUserForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: initialData ? undefined : "",
    role: "alumni",
    verified: false,
    status: "pending",
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        role: initialData.role || "alumni",
        verified: initialData.verified || false,
        status: initialData.status || "pending",
      })
    }
  }, [initialData])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (initialData) {
      onSubmit(initialData.id, formData)
    } else {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter user's full name"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter user's email address"
              required
            />
          </div>
        </div>
      </div>

      {!initialData && (
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Enter temporary password"
            required={!initialData}
          />
          <p className="text-xs text-gray-500">User will be prompted to change this password on first login.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="role">User Role</Label>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-gray-500" />
            <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alumni">Alumni</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Account Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="verified" className="block mb-2">
            Email Verification
          </Label>
          <div className="flex items-center gap-3">
            <Switch
              id="verified"
              checked={formData.verified}
              onCheckedChange={(checked) => handleChange("verified", checked)}
            />
            <div className="flex items-center gap-1 text-sm">
              <CheckCircle className={`h-4 w-4 ${formData.verified ? "text-green-500" : "text-gray-300"}`} />
              <span>{formData.verified ? "Verified" : "Not Verified"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update User" : "Create User"}</Button>
      </div>
    </form>
  )
}

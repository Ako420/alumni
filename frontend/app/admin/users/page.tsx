"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import AdminUserTable from "@/components/admin/admin-user-table"
import AdminUserForm from "@/components/admin/admin-user-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Search, Plus, UserCheck, UserX, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const { toast } = useToast()
  const { user, hasRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!hasRole("admin")) {
      router.push("/dashboard")
      return
    }

    fetchUsers()
  }, [hasRole, router])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      // In a real app, this would be an API call
      // const data = await userService.getUsers()
      // setUsers(data)

      // Mock data for demo
      setUsers([
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          role: "alumni",
          verified: true,
          status: "active",
          registeredDate: "2023-12-15T10:30:00Z",
          lastLogin: "2024-01-15T14:20:00Z",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "alumni",
          verified: true,
          status: "active",
          registeredDate: "2023-12-20T09:15:00Z",
          lastLogin: "2024-01-14T11:45:00Z",
        },
        {
          id: 3,
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          verified: true,
          status: "active",
          registeredDate: "2023-11-10T08:30:00Z",
          lastLogin: "2024-01-15T16:30:00Z",
        },
        {
          id: 4,
          name: "New User",
          email: "newuser@example.com",
          role: "alumni",
          verified: false,
          status: "pending",
          registeredDate: "2024-01-14T13:20:00Z",
          lastLogin: null,
        },
        {
          id: 5,
          name: "Blocked User",
          email: "blocked@example.com",
          role: "alumni",
          verified: true,
          status: "blocked",
          registeredDate: "2023-10-05T11:10:00Z",
          lastLogin: "2023-12-01T09:45:00Z",
        },
      ])
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async (userData) => {
    try {
      // In a real app, this would be an API call
      // await userService.createUser(userData)

      // Mock implementation
      setUsers([
        {
          id: Date.now(),
          ...userData,
          verified: false,
          status: "pending",
          registeredDate: new Date().toISOString(),
          lastLogin: null,
        },
        ...users,
      ])

      toast({
        title: "User Created",
        description: "The user has been created successfully.",
      })
      setShowCreateForm(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateUser = async (id, userData) => {
    try {
      // In a real app, this would be an API call
      // await userService.updateUser(id, userData)

      // Mock implementation
      setUsers(users.map((user) => (user.id === id ? { ...user, ...userData } : user)))

      toast({
        title: "User Updated",
        description: "The user has been updated successfully.",
      })
      setEditingUser(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      // In a real app, this would be an API call
      // await userService.deleteUser(id)

      // Mock implementation
      setUsers(users.filter((user) => user.id !== id))

      toast({
        title: "User Deleted",
        description: "The user has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleVerifyUser = async (id) => {
    try {
      // In a real app, this would be an API call
      // await userService.verifyUser(id)

      // Mock implementation
      setUsers(users.map((user) => (user.id === id ? { ...user, verified: true, status: "active" } : user)))

      toast({
        title: "User Verified",
        description: "The user has been verified successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleBlockUser = async (id) => {
    try {
      // In a real app, this would be an API call
      // await userService.blockUser(id)

      // Mock implementation
      setUsers(users.map((user) => (user.id === id ? { ...user, status: "blocked" } : user)))

      toast({
        title: "User Blocked",
        description: "The user has been blocked successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to block user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUnblockUser = async (id) => {
    try {
      // In a real app, this would be an API call
      // await userService.unblockUser(id)

      // Mock implementation
      setUsers(users.map((user) => (user.id === id ? { ...user, status: "active" } : user)))

      toast({
        title: "User Unblocked",
        description: "The user has been unblocked successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unblock user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activeUsers = filteredUsers.filter((user) => user.status === "active")
  const pendingUsers = filteredUsers.filter((user) => user.status === "pending" || !user.verified)
  const blockedUsers = filteredUsers.filter((user) => user.status === "blocked")
  const adminUsers = filteredUsers.filter((user) => user.role === "admin")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage alumni and admin users</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create User
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* User Form (Create/Edit) */}
        {(showCreateForm || editingUser) && (
          <Card>
            <CardHeader>
              <CardTitle>{editingUser ? "Edit User" : "Create New User"}</CardTitle>
              <CardDescription>
                {editingUser ? "Update the user details" : "Fill in the details to create a new user"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminUserForm
                initialData={editingUser}
                onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
                onCancel={() => {
                  setShowCreateForm(false)
                  setEditingUser(null)
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Users Table */}
        {!showCreateForm && !editingUser && (
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="active" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Active Users ({activeUsers.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Pending Verification ({pendingUsers.length})
              </TabsTrigger>
              <TabsTrigger value="blocked" className="flex items-center gap-2">
                <UserX className="h-4 w-4" />
                Blocked Users ({blockedUsers.length})
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Administrators ({adminUsers.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <AdminUserTable
                users={activeUsers}
                loading={loading}
                onEdit={setEditingUser}
                onDelete={handleDeleteUser}
                onVerify={handleVerifyUser}
                onBlock={handleBlockUser}
                onUnblock={handleUnblockUser}
              />
            </TabsContent>

            <TabsContent value="pending">
              <AdminUserTable
                users={pendingUsers}
                loading={loading}
                onEdit={setEditingUser}
                onDelete={handleDeleteUser}
                onVerify={handleVerifyUser}
                onBlock={handleBlockUser}
                onUnblock={handleUnblockUser}
              />
            </TabsContent>

            <TabsContent value="blocked">
              <AdminUserTable
                users={blockedUsers}
                loading={loading}
                onEdit={setEditingUser}
                onDelete={handleDeleteUser}
                onVerify={handleVerifyUser}
                onBlock={handleBlockUser}
                onUnblock={handleUnblockUser}
              />
            </TabsContent>

            <TabsContent value="admin">
              <AdminUserTable
                users={adminUsers}
                loading={loading}
                onEdit={setEditingUser}
                onDelete={handleDeleteUser}
                onVerify={handleVerifyUser}
                onBlock={handleBlockUser}
                onUnblock={handleUnblockUser}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  )
}

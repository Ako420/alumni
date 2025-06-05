"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import AdminAnnouncementTable from "@/components/admin/admin-announcement-table"
import AdminAnnouncementForm from "@/components/admin/admin-announcement-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Megaphone, Search, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState(null)
  const { toast } = useToast()
  const { user, hasRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!hasRole("admin")) {
      router.push("/dashboard")
      return
    }

    fetchAnnouncements()
  }, [hasRole, router])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      // In a real app, this would be an API call
      // const data = await announcementService.getAnnouncements()
      // setAnnouncements(data)

      // Mock data for demo
      setAnnouncements([
        {
          id: 1,
          title: "System Maintenance",
          content: "The alumni portal will be down for maintenance on Saturday from 2-4 AM.",
          priority: "high",
          audience: "all",
          createdAt: "2024-01-15T10:30:00Z",
          createdBy: "Admin",
          status: "active",
        },
        {
          id: 2,
          title: "New Job Board Feature",
          content: "We've launched a new job board feature. Check it out in the Jobs section!",
          priority: "medium",
          audience: "alumni",
          createdAt: "2024-01-14T14:20:00Z",
          createdBy: "Admin",
          status: "active",
        },
        {
          id: 3,
          title: "Annual Alumni Dinner",
          content: "Save the date for our annual alumni dinner on March 15th at Grand Hotel.",
          priority: "low",
          audience: "all",
          createdAt: "2024-01-13T09:15:00Z",
          createdBy: "Admin",
          status: "draft",
        },
      ])
    } catch (error) {
      console.error("Failed to fetch announcements:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAnnouncement = async (announcementData) => {
    try {
      // In a real app, this would be an API call
      // await announcementService.createAnnouncement(announcementData)

      // Mock implementation
      setAnnouncements([
        {
          id: Date.now(),
          ...announcementData,
          createdAt: new Date().toISOString(),
          createdBy: user?.name || "Admin",
        },
        ...announcements,
      ])

      toast({
        title: "Announcement Created",
        description: "The announcement has been created successfully.",
      })
      setShowCreateForm(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create announcement. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateAnnouncement = async (id, announcementData) => {
    try {
      // In a real app, this would be an API call
      // await announcementService.updateAnnouncement(id, announcementData)

      // Mock implementation
      setAnnouncements(
        announcements.map((announcement) =>
          announcement.id === id ? { ...announcement, ...announcementData } : announcement,
        ),
      )

      toast({
        title: "Announcement Updated",
        description: "The announcement has been updated successfully.",
      })
      setEditingAnnouncement(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update announcement. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAnnouncement = async (id) => {
    try {
      // In a real app, this would be an API call
      // await announcementService.deleteAnnouncement(id)

      // Mock implementation
      setAnnouncements(announcements.filter((announcement) => announcement.id !== id))

      toast({
        title: "Announcement Deleted",
        description: "The announcement has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete announcement. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-600 mt-2">Create and manage system announcements</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Announcement
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Announcement Form (Create/Edit) */}
        {(showCreateForm || editingAnnouncement) && (
          <Card>
            <CardHeader>
              <CardTitle>{editingAnnouncement ? "Edit Announcement" : "Create New Announcement"}</CardTitle>
              <CardDescription>
                {editingAnnouncement ? "Update the announcement details" : "Create a new announcement to notify users"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminAnnouncementForm
                initialData={editingAnnouncement}
                onSubmit={editingAnnouncement ? handleUpdateAnnouncement : handleCreateAnnouncement}
                onCancel={() => {
                  setShowCreateForm(false)
                  setEditingAnnouncement(null)
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Announcements Table */}
        {!showCreateForm && !editingAnnouncement && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" />
                <CardTitle>All Announcements</CardTitle>
              </div>
              <CardDescription>Manage and monitor all system announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminAnnouncementTable
                announcements={filteredAnnouncements}
                loading={loading}
                onEdit={setEditingAnnouncement}
                onDelete={handleDeleteAnnouncement}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

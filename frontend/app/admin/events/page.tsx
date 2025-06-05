"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import AdminEventTable from "@/components/admin/admin-event-table"
import AdminEventForm from "@/components/admin/admin-event-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Search, Plus, Filter } from "lucide-react"
import { eventService } from "@/services/auth-service"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function AdminEventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const { toast } = useToast()
  const { user, hasRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!hasRole("admin")) {
      router.push("/dashboard")
      return
    }

    fetchEvents()
  }, [hasRole, router])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const data = await eventService.getEvents()
      setEvents(data)
    } catch (error) {
      console.error("Failed to fetch events:", error)
      // Mock data for demo
      setEvents([
        {
          id: 1,
          title: "Alumni Meetup",
          description: "Annual alumni gathering",
          eventDate: "2025-12-01",
          eventTime: "15:00",
          location: "University Hall",
          maxAttendees: 150,
          attendeeCount: 45,
          type: "networking",
          status: "active",
        },
        {
          id: 2,
          title: "Career Workshop",
          description: "Resume building and interview tips",
          eventDate: "2025-12-15",
          eventTime: "10:00",
          location: "Virtual",
          maxAttendees: 100,
          attendeeCount: 32,
          type: "career",
          status: "active",
        },
        {
          id: 3,
          title: "Class of 2020 Reunion",
          description: "5-year reunion for the class of 2020",
          eventDate: "2026-01-20",
          eventTime: "18:00",
          location: "Grand Hotel",
          maxAttendees: 200,
          attendeeCount: 0,
          type: "reunion",
          status: "draft",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = async (eventData) => {
    try {
      await eventService.createEvent(eventData)
      toast({
        title: "Event Created",
        description: "The event has been created successfully.",
      })
      setShowCreateForm(false)
      fetchEvents()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateEvent = async (id, eventData) => {
    try {
      await eventService.updateEvent(id, eventData)
      toast({
        title: "Event Updated",
        description: "The event has been updated successfully.",
      })
      setEditingEvent(null)
      fetchEvents()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update event. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteEvent = async (id) => {
    try {
      await eventService.deleteEvent(id)
      toast({
        title: "Event Deleted",
        description: "The event has been deleted successfully.",
      })
      fetchEvents()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activeEvents = filteredEvents.filter((event) => event.status === "active")
  const draftEvents = filteredEvents.filter((event) => event.status === "draft")
  const pastEvents = filteredEvents.filter((event) => new Date(`${event.eventDate}T${event.eventTime}`) < new Date())

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
            <p className="text-gray-600 mt-2">Create and manage alumni events</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events by title, description, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Event Form (Create/Edit) */}
        {(showCreateForm || editingEvent) && (
          <Card>
            <CardHeader>
              <CardTitle>{editingEvent ? "Edit Event" : "Create New Event"}</CardTitle>
              <CardDescription>
                {editingEvent ? "Update the event details" : "Fill in the details to create a new event"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminEventForm
                initialData={editingEvent}
                onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
                onCancel={() => {
                  setShowCreateForm(false)
                  setEditingEvent(null)
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Events Table */}
        {!showCreateForm && !editingEvent && (
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="active" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Active Events ({activeEvents.length})
              </TabsTrigger>
              <TabsTrigger value="draft" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Draft Events ({draftEvents.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Past Events ({pastEvents.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <AdminEventTable
                events={activeEvents}
                loading={loading}
                onEdit={setEditingEvent}
                onDelete={handleDeleteEvent}
              />
            </TabsContent>

            <TabsContent value="draft">
              <AdminEventTable
                events={draftEvents}
                loading={loading}
                onEdit={setEditingEvent}
                onDelete={handleDeleteEvent}
              />
            </TabsContent>

            <TabsContent value="past">
              <AdminEventTable
                events={pastEvents}
                loading={loading}
                onEdit={setEditingEvent}
                onDelete={handleDeleteEvent}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  )
}

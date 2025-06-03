"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Clock, Users, Search, Filter, Plus } from "lucide-react"
import { eventService } from "@/services/auth-service"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const { hasRole } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const data = await eventService.getEvents()
      setEvents(data)
    } catch (error) {
      console.error("Failed to fetch events:", error)
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRSVP = async (eventId: number, status: string) => {
    try {
      await eventService.rsvpToEvent(eventId, status)
      toast({
        title: "RSVP Updated",
        description: `You have ${status === "yes" ? "confirmed" : "declined"} your attendance.`,
      })
      fetchEvents() // Refresh events
    } catch (error) {
      toast({
        title: "RSVP Failed",
        description: "Unable to update your RSVP. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredEvents = events.filter((event: any) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || event.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-600 mt-2">Discover and attend alumni events</p>
          </div>
          {hasRole("admin") && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                  <SelectItem value="reunion">Reunion</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event: any) => (
              <Card key={event.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="mb-2">
                      {event.type || "General"}
                    </Badge>
                    <Badge variant={event.rsvpStatus === "yes" ? "default" : "outline"}>
                      {event.rsvpStatus === "yes" ? "Attending" : "Not Attending"}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{event.eventDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{event.eventTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.attendeeCount || 0} / {event.maxAttendees} attendees
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button
                      onClick={() => handleRSVP(event.id, "yes")}
                      variant={event.rsvpStatus === "yes" ? "default" : "outline"}
                      className="flex-1"
                    >
                      {event.rsvpStatus === "yes" ? "Attending" : "RSVP Yes"}
                    </Button>
                    <Button
                      onClick={() => handleRSVP(event.id, "no")}
                      variant={event.rsvpStatus === "no" ? "destructive" : "outline"}
                      className="flex-1"
                    >
                      {event.rsvpStatus === "no" ? "Not Attending" : "Decline"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || filterType !== "all"
                  ? "Try adjusting your search or filters."
                  : "No events are currently scheduled."}
              </p>
              {hasRole("admin") && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Event
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

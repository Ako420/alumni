"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Briefcase, Users, Bell, MapPin, Clock, Plus } from "lucide-react"
import { eventService } from "@/services/auth-service"
import { jobService } from "@/services/auth-service"

export default function AlumniDashboard() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  type Job = {
    id: number
    title: string
    company: string
    location: string
    type: string
    postedBy: string
  }
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    fetchEvents()
    fetchJobs()
  }, [])

  const fetchEvents = async () => {
    try {
      const data = await eventService.getEvents()
      setEvents(data)
    } catch (error) {
      console.error("Failed to fetch events:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchJobs = async () => {
    try {
      const data = await jobService.getJobs()
      setJobs(data.slice(0, 3)) // Show only first 3 jobs
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
      // Keep mock data as fallback
      setJobs([
        {
          id: 1,
          title: "Frontend Developer",
          company: "TechSoft",
          location: "Douala",
          type: "Full-time",
          postedBy: "John Alumni",
        },
        {
          id: 2,
          title: "Marketing Manager",
          company: "Creative Agency",
          location: "Yaoundé",
          type: "Remote",
          postedBy: "Sarah Graduate",
        },
      ])
    }
  }

  const mockGroups = [
    { id: 1, name: "Class of 2020", members: 45, unread: 3 },
    { id: 2, name: "Tech Alumni", members: 78, unread: 0 },
    { id: 3, name: "Douala Chapter", members: 23, unread: 1 },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening in your alumni community</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                  <p className="text-2xl font-bold">{events.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Job Opportunities</p>
                  <p className="text-2xl font-bold">{jobs.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Groups</p>
                  <p className="text-2xl font-bold">{mockGroups.length}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Notifications</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
                <Bell className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Events */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Don't miss these exciting alumni events</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : events.length > 0 ? (
                  <div className="space-y-4">
                    {events.slice(0, 3).map((event: any) => (
                      <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {event.eventDate}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {event.eventTime}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {event.location}
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            RSVP
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No upcoming events</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Job Board</CardTitle>
                <CardDescription>Latest opportunities from alumni</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {jobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-sm text-gray-900">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {job.type}
                        </Badge>
                        <span className="text-xs text-gray-500">{job.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Jobs
                </Button>
              </CardContent>
            </Card>

            {/* Active Groups */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">My Groups</CardTitle>
                <CardDescription>Your active group conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockGroups.map((group) => (
                    <div
                      key={group.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{group.name}</h4>
                        <p className="text-xs text-gray-500">{group.members} members</p>
                      </div>
                      {group.unread > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {group.unread}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Groups
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

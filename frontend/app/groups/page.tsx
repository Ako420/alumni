"use client"

import type React from "react"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, MessageCircle, Search, Plus, UserPlus } from "lucide-react"
import { groupService } from "@/services/auth-service"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function GroupsPage() {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
  })
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    try {
      const data = await groupService.getGroups()
      setGroups(data)
    } catch (error) {
      console.error("Failed to fetch groups:", error)
      // Mock data for demo
      setGroups([
        {
          id: 1,
          name: "Class of 2020",
          description: "Connect with your 2020 graduating class",
          memberCount: 45,
          unreadMessages: 3,
          isJoined: true,
          lastActivity: "2 hours ago",
          avatar: "2020",
        },
        {
          id: 2,
          name: "Tech Alumni",
          description: "For all tech-minded alumni to share opportunities",
          memberCount: 78,
          unreadMessages: 0,
          isJoined: true,
          lastActivity: "1 day ago",
          avatar: "TECH",
        },
        {
          id: 3,
          name: "Douala Chapter",
          description: "Alumni living and working in Douala",
          memberCount: 23,
          unreadMessages: 1,
          isJoined: false,
          lastActivity: "3 hours ago",
          avatar: "DLA",
        },
        {
          id: 4,
          name: "Entrepreneurs Network",
          description: "For alumni who are entrepreneurs or want to be",
          memberCount: 34,
          unreadMessages: 0,
          isJoined: false,
          lastActivity: "5 hours ago",
          avatar: "ENT",
        },
        {
          id: 5,
          name: "Njangi 2018",
          description: "Support group for 2018 grads",
          memberCount: 28,
          unreadMessages: 5,
          isJoined: true,
          lastActivity: "30 minutes ago",
          avatar: "NJ18",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await groupService.createGroup(newGroup)
      toast({
        title: "Group Created",
        description: "Your group has been created successfully.",
      })
      setShowCreateDialog(false)
      setNewGroup({ name: "", description: "" })
      fetchGroups()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create group. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleJoinGroup = async (groupId: number) => {
    try {
      await groupService.joinGroup(groupId)
      toast({
        title: "Joined Group",
        description: "You have successfully joined the group.",
      })
      fetchGroups()
    } catch (error) {
      toast({
        title: "Join Failed",
        description: "Unable to join group. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleLeaveGroup = async (groupId: number) => {
    try {
      await groupService.leaveGroup(groupId)
      toast({
        title: "Left Group",
        description: "You have left the group.",
      })
      fetchGroups()
    } catch (error) {
      toast({
        title: "Leave Failed",
        description: "Unable to leave group. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredGroups = groups.filter(
    (group: any) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const joinedGroups = filteredGroups.filter((group: any) => group.isJoined)
  const availableGroups = filteredGroups.filter((group: any) => !group.isJoined)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Groups</h1>
            <p className="text-gray-600 mt-2">Connect with alumni communities and interest groups</p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create a New Group</DialogTitle>
                <DialogDescription>Start a new community for alumni to connect and share</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Group Name</Label>
                  <Input
                    id="name"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    placeholder="e.g. Class of 2020"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    placeholder="Describe what this group is about..."
                    rows={3}
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Group</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* My Groups */}
        {joinedGroups.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Groups</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedGroups.map((group: any) => (
                <Card key={group.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                            {group.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="group-hover:text-primary transition-colors">{group.name}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Users className="h-4 w-4" />
                            <span>{group.memberCount} members</span>
                          </div>
                        </div>
                      </div>
                      {group.unreadMessages > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {group.unreadMessages}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>Last activity: {group.lastActivity}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/groups/${group.id}`} className="flex-1">
                        <Button className="w-full">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Open Chat
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLeaveGroup(group.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Leave
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Groups */}
        {availableGroups.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Discover Groups</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableGroups.map((group: any) => (
                <Card key={group.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gray-100 text-gray-600 font-bold">{group.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="group-hover:text-primary transition-colors">{group.name}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          <span>{group.memberCount} members</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>Last activity: {group.lastActivity}</span>
                    </div>
                    <Button onClick={() => handleJoinGroup(group.id)} className="w-full">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Join Group
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredGroups.length === 0 && !loading && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery ? "Try adjusting your search." : "No groups are currently available."}
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Group
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

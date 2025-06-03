"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Send, Users, ArrowLeft, MoreVertical } from "lucide-react"
import { groupService } from "@/services/auth-service"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function GroupChatPage() {
  const params = useParams()
  const groupId = Number.parseInt(params.id as string)
  const [group, setGroup] = useState<any>(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchGroupDetails()
    fetchMessages()
  }, [groupId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const fetchGroupDetails = async () => {
    try {
      const data = await groupService.getGroupById(groupId)
      setGroup(data)
    } catch (error) {
      console.error("Failed to fetch group:", error)
      // Mock data for demo
      setGroup({
        id: groupId,
        name: "Class of 2020",
        description: "Connect with your 2020 graduating class",
        memberCount: 45,
        members: [
          { id: 1, name: "John Doe", avatar: "JD", online: true },
          { id: 2, name: "Jane Smith", avatar: "JS", online: false },
          { id: 3, name: "Mike Johnson", avatar: "MJ", online: true },
        ],
      })
    }
  }

  const fetchMessages = async () => {
    try {
      const data = await groupService.getGroupMessages(groupId)
      setMessages(data)
    } catch (error) {
      console.error("Failed to fetch messages:", error)
      // Mock data for demo
      setMessages([
        {
          id: 1,
          content: "Hey everyone! How's everyone doing?",
          sender: { name: "John Doe", avatar: "JD" },
          timestamp: "2024-01-15T10:30:00Z",
          isOwn: false,
        },
        {
          id: 2,
          content: "Great! Just got a new job at TechCorp 🎉",
          sender: { name: "Jane Smith", avatar: "JS" },
          timestamp: "2024-01-15T10:32:00Z",
          isOwn: false,
        },
        {
          id: 3,
          content: "Congratulations Jane! That's awesome news!",
          sender: { name: user?.name || "You", avatar: user?.name?.charAt(0) || "Y" },
          timestamp: "2024-01-15T10:33:00Z",
          isOwn: true,
        },
        {
          id: 4,
          content: "Thanks everyone! Really excited about this opportunity.",
          sender: { name: "Jane Smith", avatar: "JS" },
          timestamp: "2024-01-15T10:35:00Z",
          isOwn: false,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      await groupService.postMessage(groupId, newMessage)

      // Add message to local state immediately for better UX
      const newMsg = {
        id: Date.now(),
        content: newMessage,
        sender: { name: user?.name || "You", avatar: user?.name?.charAt(0) || "Y" },
        timestamp: new Date().toISOString(),
        isOwn: true,
      }
      setMessages((prev) => [...prev, newMsg])
      setNewMessage("")

      toast({
        title: "Message sent",
        description: "Your message has been posted to the group.",
      })
    } catch (error) {
      toast({
        title: "Send failed",
        description: "Unable to send message. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading group chat...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Group Header */}
        <Card className="mb-4">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/groups">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                    {group?.name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{group?.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {group?.memberCount} members
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Active</Badge>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Chat Messages */}
        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 p-0 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message: any) => (
                <div key={message.id} className={`flex gap-3 ${message.isOwn ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{message.sender.avatar}</AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col ${message.isOwn ? "items-end" : "items-start"} max-w-xs lg:max-w-md`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {message.isOwn ? "You" : message.sender.name}
                      </span>
                      <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                    </div>
                    <div
                      className={`rounded-lg px-3 py-2 ${
                        message.isOwn ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <Separator />

            {/* Message Input */}
            <div className="p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

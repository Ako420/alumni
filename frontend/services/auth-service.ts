import axios from "axios"

const API_BASE_URL = "http://localhost:8080/api"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  },

  async register(name: string, email: string, password: string, role: string) {
    const response = await api.post("/auth/register", { name, email, password, role })
    return response.data
  },

  async verifyEmail(token: string) {
    const response = await api.get(`/auth/verify?token=${token}`)
    return response.data
  },
}

export const eventService = {
  async getEvents() {
    const response = await api.get("/events")
    return response.data
  },

  async getEventById(id: number) {
    const response = await api.get(`/events/${id}`)
    return response.data
  },

  async createEvent(eventData: any) {
    const response = await api.post("/events", eventData)
    return response.data
  },

  async updateEvent(id: number, eventData: any) {
    const response = await api.put(`/events/${id}`, eventData)
    return response.data
  },

  async deleteEvent(id: number) {
    const response = await api.delete(`/events/${id}`)
    return response.data
  },

  async rsvpToEvent(eventId: number, status: string) {
    const response = await api.post(`/events/${eventId}/rsvp`, { status })
    return response.data
  },
}

export const jobService = {
  async getJobs() {
    const response = await api.get("/jobs")
    return response.data
  },

  async getJobById(id: number) {
    const response = await api.get(`/jobs/${id}`)
    return response.data
  },

  async createJob(jobData: {
    title: string
    description: string
    company: string
    location: string
    salary: string
    type: string
  }) {
    const response = await api.post("/jobs", jobData)
    return response.data
  },

  async updateJob(id: number, jobData: any) {
    const response = await api.put(`/jobs/${id}`, jobData)
    return response.data
  },

  async deleteJob(id: number) {
    const response = await api.delete(`/jobs/${id}`)
    return response.data
  },

  async applyToJob(jobId: number) {
    const response = await api.post(`/jobs/${jobId}/apply`)
    return response.data
  },
}

export const groupService = {
  async getGroups() {
    const response = await api.get("/groups")
    return response.data
  },

  async getGroupById(id: number) {
    const response = await api.get(`/groups/${id}`)
    return response.data
  },

  async createGroup(groupData: {
    name: string
    description: string
  }) {
    const response = await api.post("/groups", groupData)
    return response.data
  },

  async joinGroup(groupId: number) {
    const response = await api.post(`/groups/${groupId}/join`)
    return response.data
  },

  async leaveGroup(groupId: number) {
    const response = await api.post(`/groups/${groupId}/leave`)
    return response.data
  },

  async getGroupMessages(groupId: number) {
    const response = await api.get(`/groups/${groupId}/messages`)
    return response.data
  },

  async postMessage(groupId: number, content: string) {
    const response = await api.post(`/groups/${groupId}/messages`, { content })
    return response.data
  },

  async deleteGroup(groupId: number) {
    const response = await api.delete(`/groups/${groupId}`)
    return response.data
  },
}

export const notificationService = {
  async getNotifications() {
    const response = await api.get("/notifications")
    return response.data
  },

  async markAsRead(notificationId: number) {
    const response = await api.patch(`/notifications/${notificationId}/read`)
    return response.data
  },

  async markAllAsRead() {
    const response = await api.patch("/notifications/read-all")
    return response.data
  },

  async deleteNotification(notificationId: number) {
    const response = await api.delete(`/notifications/${notificationId}`)
    return response.data
  },
}

export default api

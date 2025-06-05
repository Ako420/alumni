"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import AdminJobTable from "@/components/admin/admin-job-table"
import AdminJobForm from "@/components/admin/admin-job-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Search, Plus, CheckCircle, XCircle } from "lucide-react"
import { jobService } from "@/services/auth-service"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const { toast } = useToast()
  const { user, hasRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!hasRole("admin")) {
      router.push("/dashboard")
      return
    }

    fetchJobs()
  }, [hasRole, router])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const data = await jobService.getJobs()
      setJobs(data)
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
      // Mock data for demo
      setJobs([
        {
          id: 1,
          title: "Frontend Developer",
          description: "Vue/React needed for exciting startup",
          company: "TechSoft",
          location: "Douala",
          salary: "400,000 XAF",
          type: "full-time",
          postedBy: "John Alumni",
          postedDate: "2024-01-15",
          status: "approved",
        },
        {
          id: 2,
          title: "Marketing Manager",
          description: "Lead marketing campaigns for growing company",
          company: "Creative Agency",
          location: "Yaoundé",
          salary: "500,000 XAF",
          type: "full-time",
          postedBy: "Sarah Graduate",
          postedDate: "2024-01-14",
          status: "pending",
        },
        {
          id: 3,
          title: "Data Analyst",
          description: "Analyze business data and create insights",
          company: "DataCorp",
          location: "Remote",
          salary: "350,000 XAF",
          type: "remote",
          postedBy: "Mike Alumni",
          postedDate: "2024-01-13",
          status: "rejected",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleCreateJob = async (jobData) => {
    try {
      await jobService.createJob(jobData)
      toast({
        title: "Job Created",
        description: "The job posting has been created successfully.",
      })
      setShowCreateForm(false)
      fetchJobs()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create job posting. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateJob = async (id, jobData) => {
    try {
      await jobService.updateJob(id, jobData)
      toast({
        title: "Job Updated",
        description: "The job posting has been updated successfully.",
      })
      setEditingJob(null)
      fetchJobs()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update job posting. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteJob = async (id) => {
    try {
      await jobService.deleteJob(id)
      toast({
        title: "Job Deleted",
        description: "The job posting has been deleted successfully.",
      })
      fetchJobs()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete job posting. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleApproveJob = async (id) => {
    try {
      await jobService.updateJob(id, { status: "approved" })
      toast({
        title: "Job Approved",
        description: "The job posting has been approved and is now visible to alumni.",
      })
      fetchJobs()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve job posting. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRejectJob = async (id) => {
    try {
      await jobService.updateJob(id, { status: "rejected" })
      toast({
        title: "Job Rejected",
        description: "The job posting has been rejected.",
      })
      fetchJobs()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject job posting. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const approvedJobs = filteredJobs.filter((job) => job.status === "approved")
  const pendingJobs = filteredJobs.filter((job) => job.status === "pending")
  const rejectedJobs = filteredJobs.filter((job) => job.status === "rejected")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
            <p className="text-gray-600 mt-2">Approve, edit, and manage job postings</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Job
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs by title, company, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Job Form (Create/Edit) */}
        {(showCreateForm || editingJob) && (
          <Card>
            <CardHeader>
              <CardTitle>{editingJob ? "Edit Job Posting" : "Create New Job Posting"}</CardTitle>
              <CardDescription>
                {editingJob ? "Update the job posting details" : "Fill in the details to create a new job posting"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminJobForm
                initialData={editingJob}
                onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
                onCancel={() => {
                  setShowCreateForm(false)
                  setEditingJob(null)
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Jobs Table */}
        {!showCreateForm && !editingJob && (
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Pending Approval ({pendingJobs.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Approved Jobs ({approvedJobs.length})
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Rejected Jobs ({rejectedJobs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <AdminJobTable
                jobs={pendingJobs}
                loading={loading}
                onEdit={setEditingJob}
                onDelete={handleDeleteJob}
                onApprove={handleApproveJob}
                onReject={handleRejectJob}
                showApprovalActions={true}
              />
            </TabsContent>

            <TabsContent value="approved">
              <AdminJobTable
                jobs={approvedJobs}
                loading={loading}
                onEdit={setEditingJob}
                onDelete={handleDeleteJob}
                showApprovalActions={false}
              />
            </TabsContent>

            <TabsContent value="rejected">
              <AdminJobTable
                jobs={rejectedJobs}
                loading={loading}
                onEdit={setEditingJob}
                onDelete={handleDeleteJob}
                onApprove={handleApproveJob}
                showApprovalActions={true}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  )
}

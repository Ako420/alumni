"use client"

import type React from "react"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Globe, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    systemNotifications: true,
    eventReminders: true,
    jobAlerts: true,
    groupMessages: true,
  })

  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: true,
    showEmail: false,
    showPhone: false,
    showLocation: true,
  })

  const [preferences, setPreferences] = useState({
    timezone: "Africa/Douala",
  })

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { isAuthenticated } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }
  }, [isAuthenticated, router])

  const handleNotificationSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, this would be an API call
      // await userService.updateNotificationSettings(notificationSettings)

      // Mock implementation
      setTimeout(() => {
        toast({
          title: t("msg.settingsSaved"),
          description: t("msg.settingsSaved"),
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      toast({
        title: t("msg.error"),
        description: t("msg.error"),
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const handlePrivacySettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, this would be an API call
      // await userService.updatePrivacySettings(privacySettings)

      // Mock implementation
      setTimeout(() => {
        toast({
          title: t("msg.settingsSaved"),
          description: t("msg.settingsSaved"),
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      toast({
        title: t("msg.error"),
        description: t("msg.error"),
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const handlePreferencesUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, this would be an API call
      // await userService.updatePreferences(preferences)

      // Mock implementation
      setTimeout(() => {
        toast({
          title: t("msg.settingsSaved"),
          description: t("msg.settingsSaved"),
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      toast({
        title: t("msg.error"),
        description: t("msg.error"),
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("settings.title")}</h1>
          <p className="text-gray-600 mt-2">{t("settings.subtitle")}</p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              {t("profile.notifications")}
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {t("settings.privacy")}
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {t("profile.preferences")}
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.emailNotifications")}</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNotificationSettingsUpdate} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications" className="text-base">
                          {t("settings.emailNotifications")}
                        </Label>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="systemNotifications" className="text-base">
                          {t("settings.systemNotifications")}
                        </Label>
                        <p className="text-sm text-gray-500">Receive in-app notifications</p>
                      </div>
                      <Switch
                        id="systemNotifications"
                        checked={notificationSettings.systemNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, systemNotifications: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="eventReminders" className="text-base">
                          {t("settings.eventReminders")}
                        </Label>
                        <p className="text-sm text-gray-500">Receive reminders about upcoming events</p>
                      </div>
                      <Switch
                        id="eventReminders"
                        checked={notificationSettings.eventReminders}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, eventReminders: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="jobAlerts" className="text-base">
                          {t("settings.jobAlerts")}
                        </Label>
                        <p className="text-sm text-gray-500">Receive notifications about new job postings</p>
                      </div>
                      <Switch
                        id="jobAlerts"
                        checked={notificationSettings.jobAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, jobAlerts: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="groupMessages" className="text-base">
                          {t("settings.groupMessages")}
                        </Label>
                        <p className="text-sm text-gray-500">Receive notifications for group messages</p>
                      </div>
                      <Switch
                        id="groupMessages"
                        checked={notificationSettings.groupMessages}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, groupMessages: checked })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={loading}>
                      {loading ? t("common.saving") : t("btn.save")}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.privacy")}</CardTitle>
                <CardDescription>Control what information is visible to other users</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePrivacySettingsUpdate} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="publicProfile" className="text-base">
                          {t("settings.publicProfile")}
                        </Label>
                        <p className="text-sm text-gray-500">Make your profile visible to other alumni</p>
                      </div>
                      <Switch
                        id="publicProfile"
                        checked={privacySettings.publicProfile}
                        onCheckedChange={(checked) =>
                          setPrivacySettings({ ...privacySettings, publicProfile: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showEmail" className="text-base">
                          {t("settings.showEmail")}
                        </Label>
                        <p className="text-sm text-gray-500">Display your email address on your profile</p>
                      </div>
                      <Switch
                        id="showEmail"
                        checked={privacySettings.showEmail}
                        onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showEmail: checked })}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showPhone" className="text-base">
                          {t("settings.showPhone")}
                        </Label>
                        <p className="text-sm text-gray-500">Display your phone number on your profile</p>
                      </div>
                      <Switch
                        id="showPhone"
                        checked={privacySettings.showPhone}
                        onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showPhone: checked })}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showLocation" className="text-base">
                          {t("settings.showLocation")}
                        </Label>
                        <p className="text-sm text-gray-500">Display your location on your profile</p>
                      </div>
                      <Switch
                        id="showLocation"
                        checked={privacySettings.showLocation}
                        onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showLocation: checked })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={loading}>
                      {loading ? t("common.saving") : t("btn.save")}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>{t("profile.preferences")}</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePreferencesUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">{t("form.language")}</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("form.language")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">{t("form.timezone")}</Label>
                      <Select
                        value={preferences.timezone}
                        onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("form.timezone")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Africa/Douala">Africa/Douala (WAT)</SelectItem>
                          <SelectItem value="Europe/Paris">Europe/Paris (CET)</SelectItem>
                          <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={loading}>
                      {loading ? t("common.saving") : t("btn.save")}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

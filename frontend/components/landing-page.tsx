"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Users, Calendar, Briefcase, MessageCircle, Award, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900">FET ALU</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            🎓 Alumni Management System
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect, Network &<span className="text-primary"> Grow Together</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join the FET Alumni community where graduates connect, share opportunities, and build lasting professional
            relationships that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8">
                Join the Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to stay connected</h2>
            <p className="text-xl text-gray-600">Comprehensive tools for alumni networking and career growth</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Events & Meetups</CardTitle>
                <CardDescription>
                  Discover and RSVP to alumni events, reunions, and professional meetups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Event calendar integration</li>
                  <li>• RSVP management</li>
                  <li>• Location-based events</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Briefcase className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Job Board</CardTitle>
                <CardDescription>Access exclusive job opportunities shared by fellow alumni</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Exclusive alumni opportunities</li>
                  <li>• Company referrals</li>
                  <li>• Career advancement</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Group Chats</CardTitle>
                <CardDescription>Join groups based on graduation year, interests, or location</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Interest-based groups</li>
                  <li>• Real-time messaging</li>
                  <li>• Community building</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Alumni Directory</CardTitle>
                <CardDescription>Connect with fellow graduates and expand your professional network</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Searchable directory</li>
                  <li>• Professional profiles</li>
                  <li>• Industry connections</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Celebrate success stories and achievements of fellow alumni</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Success stories</li>
                  <li>• Recognition system</li>
                  <li>• Inspiration sharing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                  <Star className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Stay updated with personalized notifications and announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Real-time updates</li>
                  <li>• Personalized feeds</li>
                  <li>• Important announcements</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div className="animate-slide-up">
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-primary-foreground/80">Active Alumni</div>
            </div>
            <div className="animate-slide-up">
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-primary-foreground/80">Events Hosted</div>
            </div>
            <div className="animate-slide-up">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Job Placements</div>
            </div>
            <div className="animate-slide-up">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-foreground/80">Active Groups</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to reconnect with your alumni community?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of FET graduates who are already networking, sharing opportunities, and building their
            careers together.
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="text-lg px-8">
              Join FET ALU Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GraduationCap className="h-6 w-6" />
              <span className="text-xl font-bold">FET ALU</span>
            </div>
            <div className="text-gray-400">© 2024 FET Alumni Management System. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, MapPin, CreditCard, Hospital, Globe, Phone, User, Menu } from "lucide-react"

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Desktop Navigation
  const DesktopNav = () => (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[400px]">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="ghost" className="justify-start">
                  <MapPin className="mr-2 h-4 w-4" />
                  Book Ambulance
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Hospital className="mr-2 h-4 w-4" />
                  Find Hospitals
                </Button>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[400px]">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="ghost" className="justify-start">Help Center</Button>
                <Button variant="ghost" className="justify-start">Contact</Button>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )

  // Mobile Navigation
  const MobileNav = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="flex flex-col gap-4 pt-10">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold mb-2">Services</h3>
            <Button variant="ghost" className="justify-start w-full">
              <MapPin className="mr-2 h-4 w-4" />
              Book Ambulance
            </Button>
            <Button variant="ghost" className="justify-start w-full">
              <Hospital className="mr-2 h-4 w-4" />
              Find Hospitals
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold mb-2">Resources</h3>
            <Button variant="ghost" className="justify-start w-full">Help Center</Button>
            <Button variant="ghost" className="justify-start w-full">Contact</Button>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button variant="outline" className="w-full">Login</Button>
            <Button className="w-full">Register</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  )
}

// Features Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card>
      <CardHeader>
        <div className="bg-secondary p-2 w-fit rounded-lg mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

// Testimonial Component
const TestimonialCard = ({ name, location, text }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar>
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
        <p className="text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  )
}

const features = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Quick Response",
    description: "Average response time under 10 minutes in urban areas"
  },
  {
    icon: <Hospital className="h-6 w-6" />,
    title: "Hospital Network",
    description: "Connected with leading hospitals across the country"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Wide Coverage",
    description: "Available in over 100 cities across India"
  }
]

const testimonials = [
  {
    name: "Ramesh Kumar",
    location: "New Delhi",
    text: "The quick response time and professional service saved my father's life during an emergency. Extremely grateful!"
  },
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "Excellent service! The app made it so easy to track the ambulance in real-time. Highly recommended."
  },
  {
    name: "Ahmed Khan",
    location: "Bangalore",
    text: "Professional staff and well-equipped ambulances. They arrived within minutes when we needed them most."
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <span className="text-xl font-bold">SmartAid</span>
            <Navigation />
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline">Login</Button>
            <Button>Register</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-12 md:py-24">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-6">
          <Badge variant="secondary" className="text-sm">Emergency Services</Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter lg:text-5xl">
            Quick Emergency Response When Every Second Counts
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-[700px]">
            Book and track ambulances in real-time. Connected with the best hospitals and emergency responders across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              <MapPin className="h-4 w-4" />
              Book Now
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-12 md:py-24 border-t">
        <div className="text-center max-w-[900px] mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter lg:text-4xl mb-4">
            Why Choose SmartAid
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Advanced technology meeting emergency healthcare needs with precision and care.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container px-4 py-12 md:py-24 border-t">
        <div className="text-center max-w-[900px] mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter lg:text-4xl mb-4">
            What People Say
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Real experiences from people we've helped
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2 text-muted-foreground">
                <Button variant="link" className="h-auto p-0">Book Ambulance</Button>
                <Button variant="link" className="h-auto p-0">Find Hospitals</Button>
                <Button variant="link" className="h-auto p-0">Register as Driver</Button>
                <Button variant="link" className="h-auto p-0">Emergency Contact</Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="flex flex-col gap-2 text-muted-foreground">
                <Button variant="link" className="h-auto p-0">About Us</Button>
                <Button variant="link" className="h-auto p-0">Careers</Button>
                <Button variant="link" className="h-auto p-0">Blog</Button>
                <Button variant="link" className="h-auto p-0">Press</Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="flex flex-col gap-2 text-muted-foreground">
                <Button variant="link" className="h-auto p-0">Help Center</Button>
                <Button variant="link" className="h-auto p-0">Safety Center</Button>
                <Button variant="link" className="h-auto p-0">Legal</Button>
                <Button variant="link" className="h-auto p-0">Privacy Policy</Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="flex flex-col gap-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>1800-123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
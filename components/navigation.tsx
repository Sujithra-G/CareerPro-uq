"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"
import {
  BookOpen,
  Brain,
  MapPin,
  Calendar,
  MessageCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Settings,
} from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationBell } from "@/components/notification-bell" // Added notification bell

export function Navigation() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/quiz", label: t("quiz"), icon: BookOpen },
    { href: "/recommendations", label: t("recommendations"), icon: Brain },
    { href: "/colleges", label: t("colleges"), icon: MapPin },
    { href: "/timeline", label: t("timeline"), icon: Calendar },
    { href: "/chatbot", label: t("chatbot"), icon: MessageCircle },
    { href: "/settings", label: t("settings"), icon: Settings },
  ]

  if (!user) return null

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">CareerPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button variant={isActive ? "default" : "ghost"} size="sm" className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
            <NotificationBell /> {/* Added notification bell */}
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="flex items-center space-x-2 text-destructive hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
              <span>{t("logout")}</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <NotificationBell /> {/* Added notification bell for mobile */}
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start flex items-center space-x-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout()
                  setMobileMenuOpen(false)
                }}
                className="w-full justify-start flex items-center space-x-2 text-destructive hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                <span>{t("logout")}</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

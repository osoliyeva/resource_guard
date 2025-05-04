"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileSpreadsheet, Home, Info, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const routes = [
    {
      name: "Asosiy",
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Test",
      path: "/test",
      icon: <FileSpreadsheet className="h-5 w-5" />,
    },
    {
      name: "Haqida",
      path: "/about",
      icon: <Info className="h-5 w-5" />,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-accent1/20 bg-primary text-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-6 w-6" />
          <span className="text-xl font-bold">Resource Guard</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent2",
                pathname === route.path ? "text-accent2" : "text-white/80",
              )}
            >
              {route.icon}
              {route.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-primary/90"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-accent1/20 bg-primary">
          <nav className="flex flex-col p-4 space-y-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors",
                  pathname === route.path
                    ? "bg-accent1 text-white"
                    : "text-white/80 hover:bg-accent1/20 hover:text-white",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = ["About Us", "Menu", "Gallery", "Reviews", "Contact"]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass" : ""}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-white font-display text-2xl font-bold">YEW TREE INN</div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-white hover:text-[#e8d3a5] transition-colors duration-200 font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Book Table Button */}
          <Button className="bg-[#e8d3a5] text-[#0d2e24] hover:bg-[#ffe2aa] font-semibold hover-lift">
            Book A Table
          </Button>
        </div>
      </div>
    </nav>
  )
}

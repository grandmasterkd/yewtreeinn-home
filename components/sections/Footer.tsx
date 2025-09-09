"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with Resend
    console.log("Form data:", formData)
    alert("Message sent successfully!")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <footer id="contact" className="bg-[#0d2e24] text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side - Restaurant Info */}
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs">🌳</div>
                </div>
              </div>
              <div>
                <h3 className="font-display text-3xl">YEW TREE INN</h3>
                <p className="text-[#e8d3a5] text-sm tracking-wider">BAR | CURRY | GRILL</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h4 className="text-[#e8d3a5] font-semibold mb-2">Location</h4>
                <p>123 Glasgow Street</p>
                <p>Glasgow, Scotland G1 2AB</p>
              </div>

              <div>
                <h4 className="text-[#e8d3a5] font-semibold mb-2">Phone</h4>
                <p>+44 141 000 0000</p>
              </div>

              <div>
                <h4 className="text-[#e8d3a5] font-semibold mb-2">Email</h4>
                <p>hello@yewtreeinnrestaurant.com</p>
              </div>

              <div>
                <h4 className="text-[#e8d3a5] font-semibold mb-2">Leave A Review</h4>
                <Button
                  variant="outline"
                  className="border-[#e8d3a5] text-[#e8d3a5] hover:bg-[#e8d3a5] hover:text-[#0d2e24] bg-transparent"
                >
                  Write Review
                </Button>
              </div>
            </div>

            {/* Book Table Button */}
            <div className="flex gap-4">
              <Button className="bg-[#e8d3a5] text-[#0d2e24] hover:bg-[#ffe2aa] px-8 hover-lift">
                Book A Table Now
              </Button>
              <Button size="icon" className="bg-[#e8d3a5] text-[#0d2e24] hover:bg-[#ffe2aa] rounded-full hover-lift">
                →
              </Button>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-2xl p-8">
            <h3 className="font-display text-3xl text-[#0d2e24] mb-8">CONTACT US</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#0d2e24] font-semibold mb-2">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-[#ececec] border-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[#0d2e24] font-semibold mb-2">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#ececec] border-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[#0d2e24] font-semibold mb-2">Phone Number</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-[#ececec] border-none"
                />
              </div>

              <div>
                <label className="block text-[#0d2e24] font-semibold mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-[#ececec] border-none min-h-32"
                  required
                />
              </div>

              <Button type="submit" className="bg-[#0d2e24] text-white hover:bg-[#134435] px-8 w-full hover-lift">
                Submit
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span>📷</span>
            <span>🐦</span>
            <span className="font-semibold">Yewtreeinn</span>
          </div>
          <p className="text-gray-400">Yewtreeinn.com 2025. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

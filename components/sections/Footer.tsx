"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Instagram, Twitter } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false)

    const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
   
  }

  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })
  const [reviewStatus, setReviewStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  async function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: "" })

    // Store the form element reference before async operations
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    }

    console.log("[v0] Submitting contact form data:", data)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      // Check if response is JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response")
      }

      const result = await response.json()
      console.log("[v0] Contact form response:", result)

      if (result.success) {
        setFormStatus({
          type: "success",
          message: "Message sent successfully! We will get back to you soon.",
        })
        // Use the stored form reference instead of event.currentTarget
        form.reset()
      } else {
        throw new Error(result.error || "Failed to send message")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleReviewSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsReviewSubmitting(true)
    setReviewStatus({ type: null, message: "" })

    // Store the form element reference
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = {
      review: formData.get("review"),
    }

    console.log("[v0] Submitting review data:", data)

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      // Check if response is JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response")
      }

      const result = await response.json()
      console.log("[v0] Review response:", result)

      if (result.success) {
        setReviewStatus({
          type: "success",
          message: "Thank you for your review! You will be redirected to complete it on Google.",
        })
        // Open Google review page in a new tab
        window.open("https://www.google.com/search?q=yewtreeinn.com+reviews#lrd=0x0:0x0,3", "_blank")
        // Use the stored form reference
        form.reset()
      } else {
        throw new Error(result.error || "Failed to submit review")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      setReviewStatus({
        type: "error",
        message: "Failed to submit review. Please try again.",
      })
    } finally {
      setIsReviewSubmitting(false)
    }
  }

  return (
    <footer id="contact" className="pt-8 pb-0 md:pt-16 md:pb-16 lg:pt-20 lg:pb-20">
      <div className="bg-[#0d2e24] container mx-auto px-6 lg:px-8 py-10 rounded-none md:rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left Side - Restaurant Info */}
          <div className="space-y-6 md:space-y-8">
            {/* Logo */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img
                src="/yewtreeinn_logowhite.svg"
                alt="Yew Tree Inn Logo"
                className="size-32 md:size-44 aspect-auto object-contain"
              />
            </div>

            {/* Contact Info */}
            <div className="space-y-4 md:space-y-6">
              <div>
                <h4 className="text-[#e8d3a5] font-semibold text-sm md:text-base">Location</h4>
                <p className="text-white text-sm md:text-base">123 Glasgow Street</p>
                <p className="text-white text-sm md:text-base">Glasgow, Scotland G1 2AB</p>
              </div>

              <div>
                <h4 className="text-[#e8d3a5] font-semibold text-sm md:text-base">Phone</h4>
                <p className="text-white text-sm md:text-base">+44 141 000 0000</p>
              </div>

              <div>
                <h4 className="text-[#e8d3a5] font-semibold text-sm md:text-base">Email</h4>
                <a href="mailto:info@yewtreeinn.com" className="text-white text-sm md:text-base">info@yewtreeinn.com</a>
              </div>

              <div>
                <h4 className="text-[#e8d3a5] font-semibold mb-2 text-sm md:text-base">Leave A Review</h4>

                <form onSubmit={handleReviewSubmit} className="">
                  <div className="flex flex-row items-stretch sm:items-center gap-2">
                    <Input
                      name="review"
                      required
                      minLength={10}
                      className="bg-white h-12 w-full max-w-[330px]"
                      placeholder="Write your review..."
                    />

                    <Button
                      type="submit"
                      disabled={isReviewSubmitting}
                      className="bg-[#e8d3a5] text-[#0d2e24] hover:bg-[#ffe2aa] h-12 px-8"
                    >
                      {isReviewSubmitting ? "..." : <ArrowRight className="size-4 md:size-6" />}
                    </Button>
                  </div>

                  <div className="block mt-2">
                    {reviewStatus.message && (
                      <div className={`text-xs ${reviewStatus.type === "success" ? "text-green-400" : "text-red-400"}`}>
                        {reviewStatus.message}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-3xl p-6 md:p-8">
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#0d2e24] mb-4 md:mb-6">CONTACT US</h3>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-[#0d2e24] mb-0.5 text-sm">Name</label>
                <Input name="name" required className="bg-[#ececec] border-none h-10 md:h-12" />
              </div>

              <div>
                <label className="block text-[#0d2e24] mb-0.5 text-sm">Email</label>
                <Input name="email" type="email" required className="bg-[#ececec] border-none h-10 md:h-12" />
              </div>

              <div>
                <label className="block text-[#0d2e24] mb-0.5 text-sm">Phone Number</label>
                <Input name="phone" type="tel" className="bg-[#ececec] border-none h-10 md:h-12" />
              </div>

              <div>
                <label className="block text-[#0d2e24] mb-0.5 text-sm">Message</label>
                <Textarea
                  name="message"
                  required
                  minLength={10}
                  className="bg-[#ececec] border-none min-h-24 md:min-h-32"
                />
              </div>

              {formStatus.message && (
                <div className={`text-sm ${formStatus.type === "success" ? "text-green-600" : "text-red-600"}`}>
                  {formStatus.message}
                </div>
              )}

              <div className="pt-3 flex items-center justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0d2e24] text-[#E8D3A5] hover:bg-[#134435] px-8 md:px-10 h-10 md:h-12 rounded-2xl md:rounded-3xl w-fit hover-lift text-sm md:text-base"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 md:mt-0 text-white gap-x-4 flex flex-col md:flex-row justify-between items-center md:items-end">
          <section onClick={() => scrollToSection("bookings")} className="flex justify-center items-center gap-2 mb-4 md:mb-0">
            <Button className="text-[#0d2e24] bg-[#E8D3A5] hover:bg-[#fffff] px-6 h-12 md:h-14 rounded-full hover-lift text-sm sm:text-base w-full sm:w-auto">
              Book A Table Now
            </Button>
            <Button
              size="icon"
              className="text-[#0d2e24] text-lg font-medium bg-[#E8D3A5] hover:bg-[#fffff] h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full hover-lift"
            >
              →
            </Button>
          </section>
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Instagram className="size-4 md:size-5" />
              <Twitter className="size-4 md:size-5" />
              <p className="text-white text-xs md:text-sm">Yewtreeinn</p>
            </div>
            <p className="text-white text-xs md:text-sm">Yewtreeinn.com 2025. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

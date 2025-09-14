"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Loader2 } from "lucide-react"

export default function Bookings() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPeople, setSelectedPeople] = useState(2)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedMonth, setSelectedMonth] = useState(8) // September (0-indexed)
  const [selectedYear] = useState(2025)
  const [isLoading, setIsLoading] = useState(false)
  const [bookingStatus, setBookingStatus] = useState<"idle" | "success" | "error">("idle")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const element = document.getElementById("bookings")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const timeSlots = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "18:00 - 19:00",
    "20:00 - 21:00",
    "21:00 - 22:00",
  ]

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear)
    const days = []
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i.toString().padStart(2, "0"))
    }
    return days
  }

  const stepDescriptions = {
    1: {
      title: "People",
      description:
        "Select the number of guests for your reservation. We can accommodate parties of up to 8 people through our online booking system.",
    },
    2: {
      title: "Date",
      description:
        "Choose your preferred dining date from our available calendar. We're open throughout the week with varying availability.",
    },
    3: {
      title: "Time",
      description:
        "Pick from our available time slots. We offer both lunch and dinner services with carefully curated time windows for the best experience.",
    },
    4: {
      title: "Details",
      description:
        "Please provide your contact information so we can confirm your reservation and reach out if needed.",
    },
  }

  const handleBooking = async () => {
    setIsLoading(true)
    setBookingStatus("idle")

    try {
      const bookingData = {
        people: selectedPeople,
        date: `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, "0")}-${selectedDate}`,
        time: selectedTime,
        customerInfo,
      }

      console.log("[v0] Submitting booking:", bookingData)

      const response = await fetch("/api/resos/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })

      const result = await response.json()
      console.log("[v0] Booking response:", result)

      if (response.ok && result.success) {
        setBookingStatus("success")
        // Reset form after successful booking
        setTimeout(() => {
          setCurrentStep(1)
          setSelectedPeople(2)
          setSelectedDate("")
          setSelectedTime("")
          setCustomerInfo({ name: "", email: "", phone: "", notes: "" })
          setBookingStatus("idle")
        }, 3000)
      } else {
        setBookingStatus("error")
        console.error("[v0] Booking failed:", result.error)
      }
    } catch (error) {
      console.error("[v0] Booking error:", error)
      setBookingStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="bookings" className="py-8 md:py-16 lg:py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column */}
          <div className={`space-y-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#0d2e24]">
              GET BOOKED AT
              <br />
              YEW TREE INN, TODAY
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-0">
              <div className="flex -space-x-5">
                <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white">
                  <img
                    src="/booking-headshot-3.jpg"
                    alt="Booking Headshot"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-400 border-2 border-white">
                  <img
                    src="/booking-headshot-2.jpg"
                    alt="Booking Headshot"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-500 border-2 border-white">
                  <img
                    src="/booking-headshot-1.jpg"
                    alt="Booking Headshot"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <button className="flex items-center gap-2 text-[#0d2e24] hover:text-[#134435] hover:underline transition-colors">
                <span className="text-sm md:text-base">See booking policies here</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-6">
              <h3 className="font-medium text-xl md:text-2xl text-[#0d2e24]">
                {stepDescriptions[currentStep as keyof typeof stepDescriptions].title}
              </h3>
              <p className="w-full lg:max-w-md text-base">
                {stepDescriptions[currentStep as keyof typeof stepDescriptions].description}
              </p>
            </div>

            {bookingStatus === "success" && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong>Success!</strong> Your booking has been confirmed. You'll receive a confirmation email shortly.
              </div>
            )}

            {bookingStatus === "error" && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong>Error:</strong> There was a problem creating your booking. Please try again or call us directly.
              </div>
            )}
          </div>

          {/* Right Column - Booking Interface */}
          <div className={`${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}>
            <div className="flex items-center justify-center mb-1">
              <div className="w-full bg-[#0d2e24] rounded-full flex justify-between items-center h-12 md:h-14 px-1">
                <button
                  onClick={() => setCurrentStep(1)}
                  className={`w-[200px] px-2 md:px-3 h-10 md:h-12 rounded-full text-xs md:text-sm font-medium transition-all ${
                    currentStep === 1 ? "bg-[#e8d3a5] text-[#0d2e24]" : "text-white hover:bg-[#134435]"
                  }`}
                >
                  People
                </button>
                <button
                  onClick={() => setCurrentStep(2)}
                  className={`w-[200px] px-2 md:px-3 h-10 md:h-12 rounded-full text-xs md:text-sm font-medium transition-all ${
                    currentStep === 2 ? "bg-[#e8d3a5] text-[#0d2e24]" : "text-white hover:bg-[#134435]"
                  }`}
                >
                  Date
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className={`w-[200px] px-2 md:px-3 h-10 md:h-12 rounded-full text-xs md:text-sm font-medium transition-all ${
                    currentStep === 3 ? "bg-[#e8d3a5] text-[#0d2e24]" : "text-white hover:bg-[#134435]"
                  }`}
                >
                  Time
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className={`w-[200px] px-2 md:px-3 h-10 md:h-12 rounded-full text-xs md:text-sm font-medium transition-all ${
                    currentStep === 4 ? "bg-[#e8d3a5] text-[#0d2e24]" : "text-white hover:bg-[#134435]"
                  }`}
                >
                  Details
                </button>
              </div>
            </div>

            {/* Step 1: People Selection */}
            {currentStep === 1 && (
              <div className="w-full bg-gray-100 rounded-3xl p-6 md:p-8">
                <div className="grid grid-cols-4 place-items-center gap-3 md:gap-4 max-w-sm md:max-w-md mx-auto mb-6 md:mb-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      onClick={() => setSelectedPeople(num)}
                      className={` md:w-16 md:h-16 w-12 h-12 rounded-lg font-display md:text-4xl text-3xl transition-all hover-lift ${
                        selectedPeople === num
                          ? "bg-[#e8d3a5] text-[#0d2e24] "
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-0 md:gap-0" >
                   <p className="text-gray-600 mb-6 md:mb-0 text-sm">Contact +47 000 000 0000 to book more people</p>
                   <Button
                  onClick={() => setCurrentStep(2)}
                  className="w-full md:w-fit bg-[#0d2e24] text-[#FFE2AA] hover:bg-[#134435] rounded-lg h-11 px-6 md:px-8 hover-lift"
                  >
                    Next
                  </Button>
                </div>
               
              </div>
            )}

            {/* Step 2: Date Selection */}
            {currentStep === 2 && (
              <div className="w-full bg-gray-100 rounded-2xl p-6 md:p-8 space-y-6">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number.parseInt(e.target.value))}
                    className="text-base md:text-lg font-medium bg-transparent border-none outline-none cursor-pointer"
                  >
                    {months.map((month, index) => (
                      <option key={index} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                 
                

                <div className="grid grid-cols-7 place-items-center gap-1 md:gap-2">
                  {generateCalendarDays().map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-lg font-display md:text-4xl text-3xl transition-all hover-lift ${
                        selectedDate === day
                          ? "bg-[#e8d3a5] text-[#0d2e24]"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <div className="flex justify-center md:justify-end">
                  <Button
                    onClick={() => setCurrentStep(3)}
                    disabled={!selectedDate}
                    className="w-full md:w-fit bg-[#0d2e24] text-[#FFE2AA] hover:bg-[#134435] h-11 rounded-lg px-6 md:px-8 hover-lift disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Time Selection */}
            {currentStep === 3 && (
              <div className="w-full bg-gray-100 rounded-2xl p-6 md:p-8">
                <h3 className="hidden text-base md:text-lg font-medium text-[#0d2e24] mb-4">
                  Select a time from an available slot
                </h3>

                <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 gap-3 mb-6 md:mb-8">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg font-display text-3xl md:text-4xl transition-all hover-lift ${
                        selectedTime === time
                          ? "w-full bg-[#e8d3a5] text-[#0d2e24]"
                          : "w-full bg-white text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <div className="flex justify-center md:justify-end">
                  <Button
                    onClick={() => setCurrentStep(4)}
                    disabled={!selectedTime}
                    className="w-full md:w-fit bg-[#0d2e24] text-[#FFE2AA] hover:bg-[#134435] h-11 rounded-lg px-6 md:px-8 hover-lift disabled:opacity-50 w-full sm:w-auto"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Customer Information */}
            {currentStep === 4 && (
              <div className="bg-gray-100 rounded-2xl p-6 md:p-8">
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-0">Name *</label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d2e24] focus:border-transparent"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-0">Email *</label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d2e24] focus:border-transparent"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-0">Phone</label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d2e24] focus:border-transparent"
                      placeholder="+47 000 000 000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-0">Special Requests</label>
                    <textarea
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d2e24] focus:border-transparent"
                      placeholder="Dietary restrictions, special occasions, etc."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between md:items-end items-start gap-4">
                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>{selectedPeople} People</strong>
                    </p>
                    <p>
                      {months[selectedMonth]} {selectedDate}, {selectedYear}
                    </p>
                    <p>{selectedTime}</p>
                  </div>
                  <Button
                    onClick={handleBooking}
                    disabled={!customerInfo.name || !customerInfo.email || isLoading}
                    className="bg-[#0d2e24] text-[#FFE2AA] hover:bg-[#134435] h-11 rounded-lg px-6 md:px-8 hover-lift disabled:opacity-50 w-full sm:w-auto"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

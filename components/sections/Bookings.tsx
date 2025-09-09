"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function Bookings() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPeople, setSelectedPeople] = useState(2)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

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

  const generateCalendarDays = () => {
    const days = []
    for (let i = 1; i <= 30; i++) {
      days.push(i.toString().padStart(2, "0"))
    }
    return days
  }

  const handleBooking = () => {
    // Here you would integrate with app.resos
    const bookingData = {
      people: selectedPeople,
      date: selectedDate,
      time: selectedTime,
    }

    // Redirect to resos or send data to their API
    console.log("Booking data:", bookingData)
    alert("Redirecting to booking system...")
  }

  return (
    <section id="bookings" className="py-20 bg-[#ececec]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-5xl md:text-6xl text-[#0d2e24] mb-8">
            GET BOOKED AT
            <br />
            YEW TREE INN, TODAY
          </h2>

          {/* Booking Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              {/* Step indicators */}
              <div
                className={`px-6 py-3 rounded-full ${currentStep === 1 ? "bg-[#e8d3a5] text-[#0d2e24]" : "bg-[#0d2e24] text-white"}`}
              >
                People
              </div>
              <div
                className={`px-6 py-3 rounded-full ${currentStep === 2 ? "bg-[#e8d3a5] text-[#0d2e24]" : "bg-[#0d2e24] text-white"}`}
              >
                Date
              </div>
              <div
                className={`px-6 py-3 rounded-full ${currentStep === 3 ? "bg-[#e8d3a5] text-[#0d2e24]" : "bg-[#0d2e24] text-white"}`}
              >
                Time
              </div>
            </div>
          </div>
        </div>

        {/* Booking Interface */}
        <div className={`max-w-4xl mx-auto ${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}>
          {/* Step 1: People Selection */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl p-8 text-center">
              <h3 className="font-display text-3xl text-[#0d2e24] mb-8">Select Number of People</h3>
              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSelectedPeople(num)}
                    className={`w-16 h-16 rounded-lg font-bold text-xl transition-all hover-lift ${
                      selectedPeople === num
                        ? "bg-[#e8d3a5] text-[#0d2e24]"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <p className="text-gray-600 mb-8">Contact +47 000 000 0000 to book more people</p>
              <Button
                onClick={() => setCurrentStep(2)}
                className="bg-[#0d2e24] text-white hover:bg-[#134435] px-8 hover-lift"
              >
                Next
              </Button>
            </div>
          )}

          {/* Step 2: Date Selection */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl text-[#0d2e24]">Select Date</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg">September</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-8">
                {generateCalendarDays().map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`w-12 h-12 rounded-lg font-semibold transition-all hover-lift ${
                      selectedDate === day
                        ? "bg-[#e8d3a5] text-[#0d2e24]"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={() => setCurrentStep(3)}
                  disabled={!selectedDate}
                  className="bg-[#0d2e24] text-white hover:bg-[#134435] px-8 hover-lift disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Time Selection */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl p-8">
              <h3 className="font-display text-3xl text-[#0d2e24] mb-4">Select a time from an available slot</h3>
              <p className="text-gray-600 mb-8">
                {selectedPeople} People, Tuesday, September {selectedDate} 2025
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-4 rounded-lg font-semibold transition-all hover-lift ${
                      selectedTime === time
                        ? "bg-[#e8d3a5] text-[#0d2e24]"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleBooking}
                  disabled={!selectedTime}
                  className="bg-[#0d2e24] text-white hover:bg-[#134435] px-8 hover-lift disabled:opacity-50"
                >
                  Complete Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

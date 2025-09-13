"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"

export default function Bookings() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPeople, setSelectedPeople] = useState(2)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedMonth, setSelectedMonth] = useState(8) // September (0-indexed)
  const [selectedYear] = useState(2025)

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
    <section id="bookings" className="py-8 md:py-16 lg:py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column */}
          <div className={`space-y-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
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
              <p className="w-full text-base md:text-lg">
                {stepDescriptions[currentStep as keyof typeof stepDescriptions].description}
              </p>
            </div>
          </div>

          {/* Right Column - Booking Interface */}
          <div className={`${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}>
            <div className="flex items-center justify-center mb-6">
              <div className="w-full bg-[#0d2e24] rounded-full flex justify-between items-center h-12 md:h-14 px-1">
                <button
                  onClick={() => setCurrentStep(1)}
                  className={`px-3 md:px-4 h-10 md:h-12 rounded-full text-sm font-medium transition-all ${
                    currentStep === 1 ? "bg-[#e8d3a5] text-[#0d2e24]" : "text-white hover:bg-[#134435]"
                  }`}
                >
                  People
                </button>
                <button
                  onClick={() => setCurrentStep(2)}
                  className={`px-3 md:px-4 h-10 md:h-12 rounded-full text-sm font-medium transition-all ${
                    currentStep === 2 ? "bg-[#e8d3a5] text-[#0d2e24]" : "text-white hover:bg-[#134435]"
                  }`}
                >
                  Date
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className={`px-3 md:px-4 h-10 md:h-12 rounded-full text-sm font-medium transition-all ${
                    currentStep === 3 ? "bg-[#e8d3a5] text-[#0d2e24]" : "text-white hover:bg-[#134435]"
                  }`}
                >
                  Time
                </button>
              </div>
            </div>

            {/* Step 1: People Selection */}
            {currentStep === 1 && (
              <div className="w-full bg-gray-100 rounded-2xl p-6 md:p-8 text-center">
                <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-sm md:max-w-md mx-auto mb-6 md:mb-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      onClick={() => setSelectedPeople(num)}
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-lg font-display text-lg md:text-xl transition-all hover-lift ${
                        selectedPeople === num
                          ? "bg-[#e8d3a5] text-[#0d2e24]"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 md:mb-8 text-sm">Contact +47 000 000 0000 to book more people</p>
                <Button
                  onClick={() => setCurrentStep(2)}
                  className="bg-[#0d2e24] text-white hover:bg-[#134435] px-6 md:px-8 hover-lift"
                >
                  Next
                </Button>
              </div>
            )}

            {/* Step 2: Date Selection */}
            {currentStep === 2 && (
              <div className="bg-gray-100 rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-4 md:mb-6">
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
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </div>

                <div className="grid grid-cols-7 gap-1 md:gap-2 mb-6 md:mb-8">
                  {generateCalendarDays().map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-lg font-display font-semibold text-sm md:text-base transition-all hover-lift ${
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
                    className="bg-[#0d2e24] text-white hover:bg-[#134435] px-6 md:px-8 hover-lift disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Time Selection */}
            {currentStep === 3 && (
              <div className="bg-gray-100 rounded-2xl p-6 md:p-8">
                <h3 className="text-base md:text-lg font-medium text-[#0d2e24] mb-4">
                  Select a time from an available slot
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 md:mb-8">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg font-display font-semibold text-sm md:text-base transition-all hover-lift ${
                        selectedTime === time
                          ? "bg-[#e8d3a5] text-[#0d2e24]"
                          : "bg-white text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <p className="text-gray-600 text-sm">
                    {selectedPeople} People
                    <br />
                    {months[selectedMonth]} {selectedDate}, {selectedYear}
                  </p>
                  <Button
                    onClick={handleBooking}
                    disabled={!selectedTime}
                    className="bg-[#0d2e24] text-white hover:bg-[#134435] px-6 md:px-8 hover-lift disabled:opacity-50 w-full sm:w-auto"
                  >
                    Done
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

"use client"

import { useEffect, useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

export default function Reviews() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const element = document.getElementById("reviews")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const reviews = [
    {
      name: "Sarah Mitchell",
      date: "15/11/2025",
      rating: 5,
      text: "Absolutely exceptional dining experience! The lamb biryani was perfectly spiced and the service was impeccable. The atmosphere is warm and inviting.",
    },
    {
      name: "James Robertson",
      date: "12/11/2025",
      rating: 5,
      text: "Outstanding food quality and presentation. The staff went above and beyond to make our anniversary dinner special. Highly recommend!",
    },
    {
      name: "Emma Thompson",
      date: "08/11/2025",
      rating: 5,
      text: "A hidden gem in Glasgow! The modern twist on classic dishes is brilliant. The outdoor seating area is beautiful, especially during sunset.",
    },
    {
      name: "Michael Chen",
      date: "05/11/2025",
      rating: 5,
      text: "The flavors are incredible and authentic. Every dish tells a story. The chef's attention to detail is remarkable and the ambiance is perfect for any occasion.",
    },
    {
      name: "Lisa Anderson",
      date: "02/11/2025",
      rating: 5,
      text: "Fantastic experience from start to finish! The vegetarian options are creative and delicious. The staff made us feel like family. Will definitely return!",
    },
  ]

  const nextReview = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, reviews.length - visibleCount))
  }

  const prevReview = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const getVisibleReviews = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3 // Desktop: show 3
      if (window.innerWidth >= 768) return 2 // Tablet: show 2
    }
    return 1 // Mobile: show 1
  }

  const [visibleCount, setVisibleCount] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleReviews())
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const reviewWidth = 100 / visibleCount
  const translateX = -(currentIndex * reviewWidth)

  const isAtStart = currentIndex === 0
  const isAtEnd = currentIndex >= reviews.length - visibleCount

  return (
    <section id="reviews" className="py-8 md:py-16 lg:py-20 px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className={`pl-0 md:pl-8 text-left mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#0d2e24] mb-4">
            AND SEE WHAT
            <br />
            PEOPLE SAY ABOUT US
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-x-0 md:gap-x-4 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${translateX}%)`,
              }}
            >
              {reviews.map((review, index) => (
                <div key={index} className="flex-shrink-0 px-2 md:px-0" style={{ width: `${reviewWidth}%` }}>
                  <div className="bg-gray-100 rounded-3xl p-6 md:p-8 h-full">
                    {/* Reviewer Info */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gray-400 rounded-full" />
                      <div>
                        <h4 className="font-semibold text-[#0d2e24]">{review.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{review.date}</span>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-[#e8d3a5] text-[#e8d3a5]" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Review Text */}
                    <p className="text-sm leading-relaxed">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevReview}
            disabled={isAtStart}
            className={`absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 z-10 ${
              isAtStart ? "bg-white/10 backdrop-blur-sm cursor-not-allowed opacity-50" : "bg-white/10 backdrop-blur-sm hover:scale-110"
            }`}
          >
            <ChevronLeft className={`w-6 h-6 ${isAtStart ? "text-gray-400" : "text-[#0d2e24]"}`} />
          </button>

          <button
            onClick={nextReview}
            disabled={isAtEnd}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 z-10 ${
              isAtEnd ? "bg-white/10 backdrop-blur-sm cursor-not-allowed opacity-50" : "bg-white/10 backdrop-blur-sm hover:scale-110"
            }`}
          >
            <ChevronRight className={`w-6 h-6 ${isAtEnd ? "text-gray-400" : "text-[#0d2e24]"}`} />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.max(1, reviews.length - visibleCount + 1) }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-[#0d2e24] scale-110" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

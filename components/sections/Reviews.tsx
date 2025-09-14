"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

export default function Reviews() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentIndex < reviews.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section id="reviews" className="py-8 md:py-16 lg:py-20 px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className={`pl-0 lg:pl-8 text-left mb-8 md:mb-12 lg:mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#0d2e24] mb-4">
            AND SEE WHAT
            <br />
            PEOPLE SAY ABOUT US
          </h2>
        </div>

        {/* Mobile Swipe View */}
        <div className="md:hidden">
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <div className="bg-[#FFF1D3] rounded-3xl p-6">
                    {/* Reviewer Info */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#C49A6C] rounded-full" />
                      <div>
                        <h4 className="font-semibold text-[#0D2E24]">{review.name}</h4>
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
                    <p className="text-gray-700 leading-relaxed">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevReview}
              className="p-2 rounded-full bg-[#0d2e24] text-white disabled:opacity-50"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-[#0d2e24]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-2 rounded-full bg-[#0d2e24] text-white disabled:opacity-50"
              disabled={currentIndex === reviews.length - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tablet and Desktop Marquee View */}
        <div className="hidden md:block">
          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-8 animate-marquee"
              style={{
                width: `${reviews.length * 2 * 100}%`,
                animation: "marquee 30s linear infinite",
              }}
            >
              {/* First set of reviews */}
              {reviews.map((review, index) => (
                <div key={index} className="flex-shrink-0 w-80 lg:w-96">
                  <div className="bg-[#FFF1D3] rounded-3xl p-8 h-full">
                    {/* Reviewer Info */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#C49A6C] rounded-full" />
                      <div>
                        <h4 className="font-semibold text-[#0D2E24]">{review.name}</h4>
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
                    <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {reviews.map((review, index) => (
                <div key={`duplicate-${index}`} className="flex-shrink-0 w-80 lg:w-96">
                  <div className="bg-[#FFF1D3] rounded-3xl p-8 h-full">
                    {/* Reviewer Info */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#C49A6C] rounded-full" />
                      <div>
                        <h4 className="font-semibold text-[#0D2E24]">{review.name}</h4>
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
                    <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"

export default function Reviews() {
  const [isVisible, setIsVisible] = useState(false)

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
  ]

  return (
    <section id="reviews" className="py-20">
      <div className="container mx-auto">
        {/* Header */}
        <div className={`pl-8 text-left mb-0 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-5xl text-[#0d2e24] mb-4">
            AND SEE WHAT
            <br />
            PEOPLE SAY ABOUT US
          </h2>
        </div>

        {/* Reviews Grid */}
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
        >
          {reviews.map((review, index) => (
            <div key={index} className={`bg-[#ececec] rounded-2xl p-8 animate-delay-${(index + 1) * 100}`}>
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
              <p className="text-gray-700 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

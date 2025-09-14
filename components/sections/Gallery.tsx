"use client"

import { useEffect, useState } from "react"

export default function Gallery() {
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

    const element = document.getElementById("gallery")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const galleryImages = [
    {
      src: "/gallery/muhammad-umair-Vp2SJ9_kwKY-unsplash.jpg",
      alt: "Restaurant interior",
    },
    {
      src: "/gallery/anna-blake-5z8dV82_MyA-unsplash.jpg",
      alt: "Outdoor seating",
    },
    {
      src: "/gallery/josh-berendes-z35IfrueG9s-unsplash.jpg",
      alt: "Private dining",
    },
    {
      src: "/gallery/michael-lock-uu2f5z9c4N4-unsplash.jpg",
      alt: "Bar area",
    },
  ]

  return (
    <section id="gallery" className="py-8 md:py-16 lg:py-20">
      <div className="container mx-auto px-6 lg:px-0">
        {/* Header */}
        <div className={`pl-0 md:pl-8 text-left mb-8 md:mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#134435] mb-4">
            TAKE A LOOK AROUND
            <br />
            YEW TREE INN RESTAURANT
          </h2>
        </div>

        {/* Gallery Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-x-4 gap-y-3 ${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
        >
          {galleryImages.map((image, index) => (
            <div key={index} className={`relative overflow-hidden rounded-2xl hover-lift`}>
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-[300px] md:h-[400px] lg:h-[550px] object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

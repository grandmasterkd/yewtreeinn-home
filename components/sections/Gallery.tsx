"use client"

import { useEffect, useState } from "react"

export default function Gallery() {
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
    {
      src: "/gallery/yewtree-lux-meal.jpg",
      alt: "Luxury dining experience",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [galleryImages.length])

  const infiniteImages = [...galleryImages, ...galleryImages, ...galleryImages]
  const imageWidth = 300 // Fixed width for each image
  const visibleImages = 4 // Number of images visible at once
  const translateX = -(currentIndex * imageWidth)

  return (
    <section id="gallery" className="py-8 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className={`text-left mb-8 md:mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#134435] mb-4">
            TAKE A LOOK AROUND
            <br />
            YEW TREE INN RESTAURANT
          </h2>
        </div>

        <div className={`overflow-hidden ${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}>
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(${translateX}px)`,
            }}
          >
            {infiniteImages.map((image, index) => (
              <div
                key={`${index}-${image.src}`}
                className="relative overflow-hidden rounded-2xl hover-lift flex-shrink-0 mx-2"
                style={{ width: `${imageWidth}px` }}
              >
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

        {/* Carousel indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-[#134435] scale-110" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

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
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yew_Tree_Inn.png-MTk1Hy8NK90TT2TU1oi2Sw6A8Q1w2i.jpeg",
      alt: "Restaurant interior",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yew_Tree_Inn.png-MTk1Hy8NK90TT2TU1oi2Sw6A8Q1w2i.jpeg",
      alt: "Outdoor seating",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yew_Tree_Inn.png-MTk1Hy8NK90TT2TU1oi2Sw6A8Q1w2i.jpeg",
      alt: "Private dining",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yew_Tree_Inn.png-MTk1Hy8NK90TT2TU1oi2Sw6A8Q1w2i.jpeg",
      alt: "Bar area",
    },
  ]

  return (
    <section id="gallery" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-5xl md:text-6xl text-[#134435] mb-4">
            TAKE A LOOK AROUND
            <br />
            YEW TREE INN RESTAURANT
          </h2>
        </div>

        {/* Gallery Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl hover-lift ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-64 md:h-80 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"

export default function About() {
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

    const element = document.getElementById("about-us")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <main id="about-us" className="w-full grid place-items-center">
      {/* Left Content */}
      <section className="container py-8 md:py-16 lg:py-20 space-y-5">
        <div
          className={`px-6 lg:pl-8 flex flex-col lg:flex-row items-start gap-y-8 lg:gap-x-12 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}
        >
          <div className="w-full lg:max-w-[40%]">
            <h2 className="font-display text-4xl md:text-4xl lg:text-5xl mb-0 text-black">
              FAMILY OWNED
              <br />
              AND MANAGED
            </h2>
            <p className="text-black">
              For over three generations, the Yew Tree Inn has been a cornerstone of Glasgow's dining scene. Our
              family's passion for exceptional cuisine and warm hospitality creates an unforgettable experience for all.
            </p>
          </div>

          <div className="w-full lg:max-w-[40%]">
            <h3 className="font-display text-4xl md:text-4xl lg:text-5xl mb-0 text-black">
              BRINGING A MODERN
              <br />
              TWIST ON CLASSICS
            </h3>
            <p className="text-black">
              We honor traditional recipes while embracing innovation, creating dishes that surprise and delight. Our
              chefs source the finest local ingredients to craft memorable meals that celebrate both heritage and
              creativity.
            </p>
          </div>
        </div>

        <div className={`px-6 lg:px-4 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-3">
            <div className="col-span-1 md:col-span-1 lg:col-span-6">
              <img
                src="/restaurant_service.jpg"
                alt="Restaurant service"
                className="w-full h-64 md:h-80 lg:h-[90%] object-cover rounded-3xl hover-lift"
              />
            </div>

            <div className="col-span-1 md:col-span-1 lg:col-span-3">
              <img
                src="/family-restaurant.jpg"
                alt="Family dining"
                className="w-full h-64 md:h-80 lg:h-[90%] object-cover rounded-3xl hover-lift"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

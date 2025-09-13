"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"

export default function Menu() {
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

    const element = document.getElementById("menu")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const handleViewFullMenu = () => {
    window.open("/menu.pdf", "_blank")
  }

  return (
    <main id="menu" className="w-full min-h-screen grid place-items-center bg-white">
      <section className="container py-8 md:py-16 lg:py-20 px-6 lg:px-8">
        {/* Header */}
        <div className={`pb-8 md:pb-12 text-start ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            CHECK OUT
            <br />
            OUR BEST DISHES
          </h2>
          <p className="max-w-xl text-base md:text-lg">
            Discover our signature creations, crafted with passion and the finest ingredients
          </p>
        </div>

        {/* Featured Dish */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-8 gap-8 lg:gap-x-16 items-start ${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
        >
          {/* Dish Image */}
          <div className="lg:col-span-3">
            <img
              src="/menu-dish.jpg"
              alt="Special Lamb Biryani"
              className="w-full h-[300px] md:h-[400px] lg:h-[550px] object-cover rounded-3xl hover-lift"
            />
          </div>

          {/* Dish Details */}
          <div className="h-full lg:col-span-5 flex flex-col justify-center gap-y-6 md:gap-y-8 lg:gap-y-24">
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#E8D3A5]">SPECIAL LAMB BIRYANI</h3>
                <span className="text-3xl md:text-4xl lg:text-5xl text-[#0d2e24] font-display">£11.50</span>
              </div>

              <p className="w-full text-base md:text-lg">
                Marinated lamb cooked slowly in basmati rice, flavoured with mint & rose water, served with mixed
                vegetables & raita
              </p>

              {/* Rating */}
              <div className="pt-2 flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Leaf key={i} className="w-5 h-5 md:w-6 md:h-6 fill-[#FFC757] text-[#FFC757]" />
                ))}
              </div>
            </div>

            {/* Additional Info with vertical line */}
            <div className="relative space-y-5 pt-0">
              {/* Vertical line */}
              <div className="absolute left-1.5 top-6 bottom-0 w-px bg-gray-200"></div>

              <div className="flex items-start gap-3 relative">
                <div className="w-3 h-3 bg-[#0d2e24] rounded-full mt-1.5 relative z-10" />
                <p className="text-gray-700 text-base md:text-lg">
                  Served with traditional accompaniments and fresh naan bread
                </p>
              </div>
              <div className="flex items-start gap-3 relative">
                <div className="w-3 h-3 bg-gray-400 rounded-full mt-1.5 relative z-10" />
                <p className="text-gray-500 text-base md:text-lg">Available for both dine-in and takeaway orders</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <Button
                onClick={handleViewFullMenu}
                className="bg-[#0d2e24] text-[#E8D3A5] hover:bg-[#134435] px-8 h-14 md:h-16 rounded-full text-base md:text-lg w-full sm:w-auto hover-lift"
              >
                See Full Menu
              </Button>
              <Button
                size="icon"
                onClick={handleViewFullMenu}
                className="bg-[#0d2e24] text-xl font-medium text-[#E8D3A5] hover:bg-[#134435] h-14 w-14 md:h-16 md:w-16 flex items-center justify-center rounded-full hover-lift"
              >
                →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

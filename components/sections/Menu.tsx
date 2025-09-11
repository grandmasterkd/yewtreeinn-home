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
    <main id="menu" className="w-full min-h-screen grid place-items-center">
      <section className="container mx-auto">
        {/* Header */}
        <div className={`pl-4 sm:pl-8 pb-4 md:pb-6 text-start ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl">
            CHECK OUT
            <br />
            OUR BEST DISHES
          </h2>
          <p className="max-w-xl text-sm sm:text-base">
            Discover our signature creations, crafted with passion and the finest ingredients
          </p>
        </div>

        {/* Featured Dish */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-8 gap-6 lg:gap-x-16 gap-y-3 items-start ${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
        >
          {/* Dish Image */}
          <div className="lg:col-span-3">
            <img
              src="/menu-dish.jpg"
              alt="Special Lamb Biryani"
              className="w-full h-[300px] sm:h-[400px] lg:h-[550px] object-cover rounded-3xl hover-lift"
            />
          </div>

          {/* Dish Details */}
          <div className="h-full lg:col-span-5 flex flex-col justify-center gap-y-4 md:gap-y-24">
            <div className=" space-y-1">
              <div className="flex flex-row items-center justify-between gap-3">
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#E8D3A5]">SPECIAL LAMB BIRYANI</h3>
                <span className="mr-0 lg:mr-20 text-2xl sm:text-3xl lg:text-4xl text-[#0d2e24] font-display">£11.50</span>
              </div>

              <p className="w-full text-sm md:text-base ">
                Marinated lamb cooked slowly in basmati rice, flavoured with mint & rose water, served with mixed
                vegetables & raita
              </p>

              {/* Rating */}
              <div className="pt-4 flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Leaf key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FFC757] text-[#FFC757]" />
                ))}
              </div>
            </div>

            {/* Additional Info with vertical line */}
            <div className="relative space-y-5 pt-0">
              {/* Vertical line */}
              <div className="absolute left-1.5 top-6 bottom-0 w-px bg-gray-200"></div>

              <div className="flex items-start gap-3 relative">
                <div className="w-3 h-3 bg-[#0d2e24] rounded-full mt-1.5 relative z-10" />
                <p className="text-gray-700 text-sm sm:text-base">
                  Served with traditional accompaniments and fresh naan bread
                </p>
              </div>
              <div className="flex items-start gap-3 relative">
                <div className="w-3 h-3 bg-gray-400 rounded-full mt-1.5 relative z-10" />
                <p className="text-gray-500 text-sm sm:text-base">Available for both dine-in and takeaway orders</p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-1">
              <Button
                onClick={handleViewFullMenu}
                className="bg-[#0d2e24] text-[#E8D3A5] hover:bg-[#134435] px-6 h-14 rounded-full text-sm sm:text-base w-auto sm:w-auto"
              >
                See Full Menu
              </Button>
              <Button
                size="icon"
                onClick={handleViewFullMenu}
                className="bg-[#0d2e24] text-lg font-medium text-[#E8D3A5] h-14 w-14 flex items-center justify-center rounded-full"
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

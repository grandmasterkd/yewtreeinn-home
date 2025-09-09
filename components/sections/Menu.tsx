"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

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

  return (
    <section id="menu" className="w-full min-h-screen grid place-items-center">
      <div className="container mx-auto px-16">
        {/* Header */}
        <div className={`text-start ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-5xl md:text-6xl text-[#0d2e24]">
            CHECK OUT
            <br />
            OUR BEST DISHES
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our signature creations, crafted with passion and the finest ingredients
          </p>
        </div>

        {/* Featured Dish */}
        <div
          className={`grid lg:grid-cols-2 gap-12 items-start ${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
        >
          {/* Dish Image */}
     
            <img
              src="/menu-dish.jpg"
              alt="Special Lamb Biryani"
             className="w-full h-full object-cover rounded-xl hover-lift"
            />
   

          {/* Dish Details */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-4xl text-[#0d2e24] mb-4">SPECIAL LAMB BIRYANI</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Marinated lamb cooked slowly in basmati rice, flavoured with mint & rose water, served with mixed
                vegetables & raita
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#e8d3a5] text-[#e8d3a5]" />
                ))}
              </div>
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <span className="font-display text-4xl text-[#0d2e24]">£11.50</span>
              <div className="flex gap-4">
                <Button className="bg-[#0d2e24] text-white hover:bg-[#134435] px-8 hover-lift">See Full Menu</Button>
                <Button size="icon" className="bg-[#0d2e24] text-white hover:bg-[#134435] rounded-full hover-lift">
                  →
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#0d2e24] rounded-full mt-2" />
                <p className="text-gray-700">Served with traditional accompaniments and fresh naan bread</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2" />
                <p className="text-gray-500">Available for both dine-in and takeaway orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

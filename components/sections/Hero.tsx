"use client"

import { useState, useEffect } from "react"

export default function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat mx-auto w-screen"
      style={{
        backgroundImage: "url('/yewtreeinn-herobg.jpg')",
      }}
    >
      <nav
        className={`absolute top-12 inset-x-8 lg:inset-x-36 transform transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-full h-16 px-2 flex items-center justify-between border border-white/10">
          <div className="flex items-center">
            <img  src="/yewtreeinn_logowhitebg.svg" alt="Yew Tree Inn Logo" className="-pl-2 size-24" />
          </div>

          <div className="hidden text-sm lg:flex items-center gap-x-6">
            {[
              { label: "About Us", id: "about" },
              { label: "Menu", id: "menu" },
              { label: "Gallery", id: "gallery" },
              { label: "Reviews", id: "reviews" },
              { label: "Contact", id: "contact" },
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-white hover:text-white/80 transition-all duration-300 font-inter text-sm xl:text-base hover:scale-105 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToSection("bookings")}
            className={`hidden lg:block bg-white text-black w-[140px] h-12 rounded-full hover:bg-white/90 transition-all duration-300 font-inter text-sm xl:text-base hover:scale-105 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            style={{ transitionDelay: "700ms" }}
          >
            Book A Table
          </button>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white p-2">
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1" : ""}`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}
              ></span>
            </div>
          </button>
        </div>

        <div
          className={`lg:hidden mt-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0"}`}
        >
          <div className="">
            {[
              { label: "About Us", id: "about" },
              { label: "Menu", id: "menu" },
              { label: "Gallery", id: "gallery" },
              { label: "Reviews", id: "reviews" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-white hover:text-white/80 transition-colors font-inter py-2 px-3 rounded-lg hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("bookings")}
              className="w-full bg-white text-black py-3 rounded-full hover:bg-white/90 transition-colors font-inter mt-4"
            >
              Book A Table
            </button>
          </div>
        </div>
      </nav>

      <div className="absolute bottom-8 md:bottom-12 inset-x-8 lg:inset-x-36 ">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end max-w-7xl mx-auto lg:gap-0">
          <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            style={{ transitionDelay: "800ms" }}
          >
            <span className="font-display text-white text-6xl md:text-7xl xl:text-8xl">
              LOREM IPSUM
              <br />
              DOLOR SIT AMET
            </span>
          </div>
          <div
            className={`max-w-md lg:max-w-sm xl:max-w-md transition-all duration-1000 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            style={{ transitionDelay: "1000ms" }}
          >
            <div className="mb-4 text-white font-medium font-inter text-sm md:text-base ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

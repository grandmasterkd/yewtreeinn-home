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
    <main id="about-us" className="w-full min-h-screen grid place-items-center">
       
          {/* Left Content */}
        <section className="container pt-20 space-y-5" >
            <div className={`pl-8 flex items-start gap-x-12 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
              <div className="max-w-[40%]" >
              <h2 className="font-display text-5xl mb-0">
                FAMILY OWNED
                <br />
                AND MANAGED
              </h2>
              <p className=" ">
                For over three generations, the Yew Tree Inn has been a cornerstone of Glasgow's dining scene. Our
                family's passion for exceptional cuisine and warm hospitality creates an unforgettable experience for
                all.
              </p>
              </div>

              <div className="max-w-[40%]" >
              <h3 className="font-display text-5xl mb-0">
                BRINGING A MODERN
                <br />
                TWIST ON CLASSICS
              </h3>
              <p className=" ">
                We honor traditional recipes while embracing innovation, creating dishes that surprise and delight. Our
                chefs source the finest local ingredients to craft memorable meals that celebrate both heritage and
                creativity.
              </p>
              </div>
            </div>

         
          

         <div className={`${isVisible ? "animate-slide-in-left" : "opacity-0"}`} >
          <div className="grid grid-cols-9 gap-3" >
            <div className="col-span-6" >
              <img src="/restaurant_service.jpg" alt="Restaurant service" className="w-full h-[90%] object-cover rounded-3xl hover-lift" />
            </div>
            
            <div className="col-span-3" >
             <img src="/family-restaurant.jpg"  alt="Family dining" className="w-full h-[90%] object-cover rounded-3xl hover-lift" />
            </div>
           
          </div>
         </div>
    </section>
    </main>
  )
}

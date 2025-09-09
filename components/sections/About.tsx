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
    <main id="about-us" className="min-h-screen">
      <div className="">
       
          {/* Left Content */}
          <section className={` flex items-start gap-x-8 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="max-w-[40%]" >
              <h2 className="font-display text-5xl mb-4">
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
              <h3 className="font-display text-5xl mb-4">
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
          </section>

         <section className={`${isVisible ? "animate-slide-in-left" : "opacity-0"}`} >
          <div className="grid grid-cols-7 gap-3" >
            <div className="col-span-5" >
              <img src="/restaurant_service.jpg" alt="Restaurant service" className="w-full h-[500px] object-cover rounded-xl hover-lift" />
            </div>
            
            <div className="col-span-2" >
             <img src="/family-restaurant.jpg"  alt="Family dining" className="w-full h-[500px] object-cover rounded-xl hover-lift" />
            </div>
           
          </div>
         </section>
     
      </div>
    </main>
  )
}

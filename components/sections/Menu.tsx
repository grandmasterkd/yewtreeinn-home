"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"

const dishes = [
  {
    name: "CHICKEN NOODLES",
    price: "£8.00",
    description: "Chow mein noodles served smothered with soya sauce and mix shredded vegetables",
    image: "/chicken-noodles-dish.jpg",
    additionalInfo: [
      "Cooking time: ~15 minutes",
      "Allergens: Contains soy, wheat (gluten)",
      "Taste/Benefit: Light yet savoury, quick energy from carbs & lean protein",
      "Serving note: Best enjoyed hot and freshly tossed",
    ],
  },
  {
    name: "YEW TREE SPECIAL MIXED GRILL",
    price: "£32.00",
    description:
      "An assortment of Chicken Tikka, Lamb Seekh Kebab, Chicken Hariyali Tikka, Chicken Malai Tikka, Tandoori King Prawns, Salmon Tikka, Fish Pakora, Chicken Wings and Lamb Chops — all marinated in authentic Indian spices, cooked in a clay oven",
    image: "/yewtreeinn-special-mixed-grill-dish.jpg",
    additionalInfo: [
      "Cooking time: ~25–30 minutes",
      "Allergens: Contains shellfish (prawns), dairy (yogurt marinades), fish",
      "Taste/Benefit: A smoky, protein-rich feast with bold flavours",
      "Serving note: Ideal for sharing, served sizzling from the tandoor",
    ],
  },
  {
    name: "LAMB ROGAN JOSH",
    price: "£11.50",
    description:
      "Tender lamb pieces cooked with ginger and garlic paste and a mix of Indian spices, blended with onion and tomato, finished with fresh coriander garnish",
    image: "/lamb-rogan-dish.jpg",
    additionalInfo: [
      "Cooking time: ~20 minutes",
      "Allergens: Typically dairy-free, nut-free (check cross-contamination)",
      "Taste/Benefit: Aromatic and hearty, rich in protein & iron",
      "Spice level: Medium, with warming spice notes",
    ],
  },
  {
    name: "ALOO SAAG",
    price: "£8.50",
    description:
      "A classic Indian side dish featuring potatoes fried in fresh spinach, cooked together with onion, green chilli, tomato, ginger and garlic",
    image: "/aloo-saag-dish.jpg",
    additionalInfo: [
      "Cooking time: ~15–20 minutes",
      "Allergens: Vegan-friendly, gluten-free",
      "Taste/Benefit: Earthy, comforting, packed with iron and fibre",
      "Serving note: Pairs beautifully with naan or basmati rice",
    ],
  },
  {
    name: "HIMALAYAN GOAT CURRY",
    price: "£13.00",
    description: "Cooked slowly, goat meat is tender and juicy with a delicious flavour that is most similar to lamb",
    image: "/himalayan-goat-curry-dish.jpg",
    additionalInfo: [
      "Cooking time: ~35–40 minutes (slow-cooked)",
      "Allergens: Usually dairy-free, nut-free (check preparation)",
      "Taste/Benefit: Deep, robust flavour with lean, nutrient-rich protein",
      "Serving note: Best enjoyed with warm naan or steamed rice",
    ],
  },
]

export default function Menu() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentDishIndex, setCurrentDishIndex] = useState(0)
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const dishInterval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentDishIndex((prev) => (prev + 1) % dishes.length)
        setCurrentInfoIndex(0) // Reset info index when dish changes
        setIsTransitioning(false)
      }, 700) // Transition duration
    }, 14000)

    return () => clearInterval(dishInterval)
  }, [])

  useEffect(() => {
    const infoInterval = setInterval(() => {
      const currentDish = dishes[currentDishIndex]
      setCurrentInfoIndex((prev) => (prev + 1) % currentDish.additionalInfo.length)
    }, 3000)

    return () => clearInterval(infoInterval)
  }, [currentDishIndex])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    const element = document.getElementById("menu")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const handleViewFullMenu = () => {
    window.open("/yewtreeinn_a3menu_update1_web.pdf", "_blank")
  }

  const currentDish = dishes[currentDishIndex]
  const visibleInfoItems = [
    currentDish.additionalInfo[currentInfoIndex],
    currentDish.additionalInfo[(currentInfoIndex + 1) % currentDish.additionalInfo.length],
  ]

  return (
    <main id="menu" className="w-full min-h-screen grid place-items-center bg-white">
      <section className="container py-8 md:pb-16 lg:pb-20 px-6 lg:px-8">
        {/* Header */}
        <div className={`pb-8 md:pb-12 text-start ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">
            CHECK OUT
            <br />
            OUR BEST DISHES
          </h2>
          <p className="max-w-xl text-base">
            Discover our signature creations, crafted with passion and the finest ingredients
          </p>
        </div>

        {/* Featured Dish */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-8 gap-8 lg:gap-x-16 items-start ${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
        >
          {/* Dish Image */}
          <div className="lg:col-span-3">
            <div
              className={`transition-all duration-500 ease-in-out ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
            >
              <img
                src={currentDish.image || "/placeholder.svg"}
                alt={currentDish.name}
                className="w-full h-[300px] md:h-[400px] lg:h-[550px] object-cover rounded-3xl hover-lift"
              />
            </div>
          </div>

          {/* Dish Details */}
          <div className="h-full lg:col-span-5 flex flex-col justify-center gap-y-6 md:gap-y-8 lg:gap-y-16">
            <div
              className={`space-y-2 md:space-y-1 transition-all duration-500 ease-in-out ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#E8D3A5]">{currentDish.name}</h3>
                <span className="text-3xl md:text-4xl lg:text-5xl text-[#0d2e24] font-display">
                  {currentDish.price}
                </span>
              </div>

              <p className="w-full text-base">{currentDish.description}</p>

              {/* Rating */}
              <div className="pt-2 flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Leaf key={i} className="w-5 h-5 fill-[#FFC757] text-[#FFC757]" />
                ))}
              </div>
            </div>

            {/* Additional Info with vertical line */}
            <div className="relative space-y-5 pt-0">
              <h3 className="text-xl text-[#0D2E24] font-medium">Additional Info</h3>
              {/* Vertical line */}
              <div className="absolute left-1.5 top-10 bottom-0 w-px bg-gray-200"></div>

              <div className="space-y-4">
                {visibleInfoItems.map((info, index) => (
                  <div
                    key={`${currentInfoIndex}-${index}`}
                    className={`flex items-start gap-3 relative transition-all duration-700 ease-in-out ${
                      index === 0 ? "opacity-100 translate-y-0" : "opacity-60 translate-y-0"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full mt-1.5 relative z-10 transition-colors duration-500 ${
                        index === 0 ? "bg-[#0d2e24]" : "bg-gray-400"
                      }`}
                    />
                    <p
                      className={`text-base transition-colors duration-500 ${
                        index === 0 ? "text-gray-700 font-medium" : "text-gray-500"
                      }`}
                    >
                      {info}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div  onClick={handleViewFullMenu} className="flex items-center gap-1 pt-4">
              <Button
               
                className="bg-[#0d2e24] text-[#E8D3A5] hover:bg-[#134435] w-fit px-8 h-14 rounded-full text-base hover-lift"
              >
                See Full Menu
              </Button>
              <Button
                size="icon"
                onClick={handleViewFullMenu}
                className="bg-[#0d2e24] text-xl font-medium text-[#E8D3A5] hover:bg-[#134435] h-14 w-14 flex items-center justify-center rounded-full hover-lift"
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

import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Menu from "@/components/sections/Menu"
import Bookings from "@/components/sections/Bookings"
import Gallery from "@/components/sections/Gallery"
import Reviews from "@/components/sections/Reviews"
import Footer from "@/components/sections/Footer"

export default function Home() {
  return (
    <main className="">
      <Hero />
      <section id="about">
        <About />
      </section>
      <section id="menu">
        <Menu />
      </section>
      <section id="bookings">
        <Bookings />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
      <section id="reviews">
        <Reviews />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </main>
  )
}

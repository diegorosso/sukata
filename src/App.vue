<script setup>
import Header from "./components/Header.vue";
import Hero from "./components/Hero.vue";
import About from "./components/About.vue";
import Schedule from "./components/Schedule.vue";
import Benefits from "./components/Benefits.vue";
import Instructors from "./components/Instructors.vue";
import Gallery from "./components/Gallery.vue";
import Contact from "./components/Contact.vue";
import Footer from "./components/Footer.vue";
import Assistant from "./components/Assistant.vue";
</script>

<template>
  <div
    className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white"
  >
    <Header></Header>
    <main>
      <section id="home">
        <Hero />
      </section>
      <section id="about" className="py-20 bg-black border-y border-zinc-900">
        <About />
      </section>
      <section id="schedule" className="py-20 bg-zinc-950">
        <Schedule />
      </section>
      <section id="benefits" className="py-20 bg-black">
        <Benefits />
      </section>
      <section id="instructors" className="py-20 bg-zinc-950">
        <Instructors />
      </section>
      <section id="gallery" className="py-20 bg-black">
        <Gallery />
      </section>
      <section id="contact" className="py-20 bg-zinc-950">
        <Contact />
      </section>
    </main>
     <Footer />

     <Assistant />
  </div>
</template>

<style >
html {
  scroll-behavior: smooth;
}
</style>

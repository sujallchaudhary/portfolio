import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { About } from "@/components/About";
import { Reviews } from "@/components/Reviews";

export default function HomePage() {
  return (
    <>
      <Hero />

      <SectionHeading
        id="skills"
        label="Toolbox"
        title="Tools I reach"
        accent="for daily"
      />
      <Skills />

      <SectionHeading
        id="about"
        label="Field notes"
        title="About"
        accent="the developer"
      />
      <About />

      <SectionHeading
        id="projects"
        label="Build log"
        title="Shipped &"
        accent="in the wild"
      />
      <Projects />

      <SectionHeading
        id="reviews"
        label="Margin notes"
        title="What people"
        accent="say"
      />
      <Reviews />

      <SectionHeading
        id="contact"
        label="Open line"
        title="Start a"
        accent="conversation"
      />
      <Contact />
    </>
  );
}

import Hero from "@/components/Hero";
import Heading from "@/components/Heading";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { About } from "@/components/About";
import { Reviews } from "@/components/Reviews";

export default function HomePage() {
    return(
       <>
         <Hero />
        <Heading text="skills" />
        <Skills />
        <Heading text="about"/>
        <About />
        <Heading text="projects" />
        <Projects />
        <Heading text="reviews" />
        <Reviews />
        <Heading text="contact" />
        <Contact />

       </>
    )
};

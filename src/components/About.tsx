import Image from "next/image";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

const CHAPTERS = [
  {
    heading: "Introduction",
    name: "Sujal Chaudhary",
    designation: "Full Stack Developer",
    src: "/about.png",
    quote:
      "Hi, I'm Sujal Chaudhary! I'm passionate about web development and excel at solving real-life problems through technology. With a strong skill set in building complex projects, I thrive on tackling challenges and creating innovative solutions. I'm always ready for collaborations and open to new work opportunities to continue growing and making an impact",
  },
  {
    heading: "Education",
    name: "Netaji Subhas University of Technology (NSUT)",
    designation: "Computer Science Engineering (CSAI)",
    src: "/college.jpg",
    quote:
      "I am a student at NSUT, currently enrolled in the B.Tech Computer Science and Artificial Intelligence program. Passionate about technology, I focus on developing innovative solutions and improving my skills. At NSUT, I am actively learning and growing in the field of computer science. I have a keen interest in exploring new technologies.",
  },
  {
    heading: "Skills",
    name: "Web Development",
    designation: "",
    src: "/wd.jpg",
    quote:
      "I am a skilled developer with expertise in web development, specializing in technologies like Next.js and the MERN stack to build robust and scalable applications. I have hands-on experience with PHP for backend solutions and DevOps practices to streamline development workflows. Writing production-level code is a standard I uphold, ensuring efficiency and maintainability in every project.",
  },
  {
    heading: "Hobbies",
    name: "Beyond the Screen",
    designation: "",
    src: "/gaming.jpg",
    quote:
      "I am deeply passionate about technology and constantly strive to learn and explore new ideas. I enjoy discussing innovative concepts and thinking critically about new topics. Recently, I have developed an interest in reading books, which has been a refreshing way to gain new perspectives. In my free time, I unwind by playing video games and sometimes indulge in a game of badminton to stay active. Balancing my love for learning, and engaging hobbies keeps me motivated and active for new challenges.",
  },
];

export function About() {
  return (
    <section className="mx-auto max-w-6xl space-y-20 px-6 py-14 lg:px-8">
      {CHAPTERS.map((chapter, i) => {
        const reversed = i % 2 === 1;
        return (
          <div
            key={chapter.heading}
            className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16"
          >
            <Reveal
              className={cn(
                "mx-auto w-full max-w-sm lg:col-span-5",
                reversed && "lg:order-2"
              )}
            >
              <figure
                className={cn(
                  "border-2 border-ink bg-paper p-3 shadow-print",
                  reversed ? "-rotate-1" : "rotate-1"
                )}
              >
                <Image
                  src={chapter.src}
                  alt={chapter.name || chapter.heading}
                  width={800}
                  height={900}
                  className="aspect-[4/5] w-full object-cover"
                />
                <figcaption className="pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  fig. {String(i + 2).padStart(2, "0")} —{" "}
                  {chapter.heading.toLowerCase()}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal
              delay={0.12}
              className={cn("lg:col-span-7", reversed && "lg:order-1")}
            >
              <span className="inline-block bg-blue px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-paper">
                {chapter.heading}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight [text-wrap:balance] sm:text-3xl">
                {chapter.name}
              </h3>
              {chapter.designation && (
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                  {chapter.designation}
                </p>
              )}
              <p className="mt-5 max-w-xl leading-relaxed text-muted">
                {chapter.quote}
              </p>
            </Reveal>
          </div>
        );
      })}
    </section>
  );
}

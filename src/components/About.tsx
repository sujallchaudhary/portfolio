import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function About() {
  const testimonials = [
    {
      quote:
        "Hi, I'm Sujal Chaudhary! I'm passionate about web development and excel at solving real-life problems through technology. With a strong skill set in building complex projects, I thrive on tackling challenges and creating innovative solutions. I'm always ready for collaborations and open to new work opportunities to continue growing and making an impact",
      name: "Sujal Chaudhary",
      designation: "Full Stack Developer",
      src: "https://sdrive.blr1.cdn.digitaloceanspaces.com/files/4d01ac20180151d14271700be8b45822.jpg",
      heading:"Introduction"
    },
    {
      quote:"I am a student at NSUT, currently enrolled in the B.Tech Computer Science and Artificial Intelligence program.Passionate about technology, I focus on developing innovative solutions and improving my skills.At NSUT, I am actively learning and growing in the field of computer science. I have a keen interest in exploring new technologies.",
      name: "Netaji Subhas University of Technology(NSUT)",
      designation: "Computer Science Engineering(CSAI)",
      src: "/college.jpg",
      heading:"Education"
    },
    {
      quote:
        "I am a skilled developer with expertise in web development, specializing in technologies like Next.js and the MERN stack to build robust and scalable applications. I have hands-on experience with PHP for backend solutions and DevOps practices to streamline development workflows. Writing production-level code is a standard I uphold, ensuring efficiency and maintainability in every project.",
      name: "Web Development",
      designation: "",
      src: "/wd.jpg",
      heading:"Skills"
    },
    {
      quote:"I am deeply passionate about technology and constantly strive to learn and explore new ideas. I enjoy discussing innovative concepts and thinking critically about new topics. Recently, I have developed an interest in reading books, which has been a refreshing way to gain new perspectives. In my free time, I unwind by playing video games and sometimes indulge in a game of badminton to stay active. Balancing my love for learning, and engaging hobbies keeps me motivated and active for new challenges.",
      name: "",
      designation: "",
      src: "/gaming.jpg",
      heading:"Hobbies"
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}

import Marquee from "./ui/marquee";

const reviews = [
  {
    name: "Aarav",
    username: "@aarav",
    body: "Your work is truly groundbreaking! I am in awe of your innovative projects and the way you approach problem-solving. Keep up the amazing work.",
    img: "https://api.dicebear.com/9.x/identicon/svg?seed=Aarav",
  },
  {
    name: "Priya",
    username: "@priya",
    body: "I've never seen anything like this before! Your creativity and attention to detail in your projects are outstanding. It's truly inspiring.",
    img: "https://api.dicebear.com/9.x/identicon/svg?seed=Priya",
  },
  {
    name: "Raj",
    username: "@raj",
    body: "I'm truly amazed by your work! Your innovative ideas are changing the game, and it's clear how much effort you put into every project. Keep shining!",
    img: "https://api.dicebear.com/9.x/identicon/svg?seed=Raj",
  },
  {
    name: "Neha",
    username: "@neha",
    body: "I'm speechless! Your work is incredibly inspiring and innovative. The way you push boundaries in every project is remarkable.",
    img: "https://api.dicebear.com/9.x/identicon/svg?seed=Neha",
  },
  {
    name: "Vikram",
    username: "@vikram",
    body: "Your projects are a true testament to your creativity and skill. Im amazed at how innovative and impactful your work is. Keep it up!",
    img: "https://api.dicebear.com/9.x/identicon/svg?seed=Vikram",
  },
  {
    name: "Simran",
    username: "@simran",
    body: "Your work is incredible! The way you approach problems with innovation and creativity is truly inspiring. I can't wait to see what you do next.",
    img: "https://api.dicebear.com/9.x/identicon/svg?seed=Simran",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure className="ruled w-80 border-2 border-ink bg-paper p-5 shadow-print-sm transition-transform duration-300 hover:-rotate-1">
      <blockquote className="text-sm leading-relaxed text-ink">
        &ldquo;{body}&rdquo;
      </blockquote>
      <div className="mt-4 flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-8 w-8 border-2 border-ink bg-paper"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div>
          <figcaption className="text-sm font-semibold">{name}</figcaption>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
            {username}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function Reviews() {
  return (
    <section className="relative overflow-hidden py-14">
      <Marquee pauseOnHover className="[--duration:40s] [--gap:1.5rem]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="mt-4 [--duration:40s] [--gap:1.5rem]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-paper" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-paper" />
    </section>
  );
}

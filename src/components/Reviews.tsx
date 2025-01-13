import { cn } from "@/lib/utils";
import Marquee from "./ui/marquee";
const reviews = [
    {
      "name": "Aarav",
      "username": "@aarav",
      "body": "Your work is truly groundbreaking! I am in awe of your innovative projects and the way you approach problem-solving. Keep up the amazing work.",
      "img": "https://api.dicebear.com/9.x/identicon/svg?seed=Aarav"
    },
    {
      "name": "Priya",
      "username": "@priya",
      "body": "I've never seen anything like this before! Your creativity and attention to detail in your projects are outstanding. It's truly inspiring.",
      "img": "https://api.dicebear.com/9.x/identicon/svg?seed=Priya"
    },
    {
      "name": "Raj",
      "username": "@raj",
      "body": "I'm truly amazed by your work! Your innovative ideas are changing the game, and it's clear how much effort you put into every project. Keep shining!",
      "img": "https://api.dicebear.com/9.x/identicon/svg?seed=Raj"
    },
    {
      "name": "Neha",
      "username": "@neha",
      "body": "I'm speechless! Your work is incredibly inspiring and innovative. The way you push boundaries in every project is remarkable.",
      "img": "https://api.dicebear.com/9.x/identicon/svg?seed=Neha"
    },
    {
      "name": "Vikram",
      "username": "@vikram",
      "body": "Your projects are a true testament to your creativity and skill. Im amazed at how innovative and impactful your work is. Keep it up!",
      "img": "https://api.dicebear.com/9.x/identicon/svg?seed=Vikram"
    },
    {
      "name": "Simran",
      "username": "@simran",
      "body": "Your work is incredible! The way you approach problems with innovation and creativity is truly inspiring. I can't wait to see what you do next.",
      "img": "https://api.dicebear.com/9.x/identicon/svg?seed=Simran"
    }
  ]
  

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
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Reviews() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-black md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-black"></div>
    </div>
  );
}

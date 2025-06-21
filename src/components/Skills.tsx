"use client";
import { useEffect, useState } from "react";
import { HoverEffect } from "./ui/card-hover-effect";

export default function Skills() {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        async function fetchskills() {
            const response = await fetch("https://api.sujal.info/api/portfolio/skills", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setSkills(data.data);
        }

        fetchskills();
    }, []);

    return (
        <div className="max-w-6xl bg-dot-white/[0.3] relative mx-auto px-8 flex h-full flex-col items-center justify-center rounded-lg bg-background md:shadow-xl">
                  <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(circle_at_center,transparent_20%,black)]"></div>

            <HoverEffect items={skills} />
        </div>
    );
}
"use client";
import { ProjectCard } from "./ProjectCard"
import { useEffect, useState } from "react";
interface ProjectDataInterface {
  _id:string;
  name: string;
  description: string;
  thumbnail: string;
  demoLink: string;
  sourceCodeLink: string;
};
const api = process.env.NEXT_PUBLIC_API_URL;
  export default function Projects() {
    const [projects, setProjects] = useState<ProjectDataInterface[]>([]);

    useEffect(() => {
        async function fetchProjects() {
            const response = await fetch(api + "/api/portfolio/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setProjects(data.data);
        }
        fetchProjects();
    }, []);
    return (
        <div className="bg-background mt-4 dark:bg-black text-white flex flex-col items-center justify-center">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          projectName={project.name}
          projectDescription={project.description}
          projectImg={project.thumbnail}
          projectDemo={project.demoLink}
          projectSourceCode={project.sourceCodeLink}
        />
      ))}
  </div>
</div>


    )
  }
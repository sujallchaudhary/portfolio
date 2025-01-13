"use client";
import { ProjectCard } from "./ProjectCard"
import { useEffect, useState } from "react";
interface ProjectDataInterface {
    projectName: string;
    projectDescription: string;
    projectImg: string;
    projectDemo: string;
    projectSourceCode: string;
    isLive: string;
    isSourceCode: string;
};
  export default function Projects() {
    const [projects, setProjects] = useState<ProjectDataInterface[]>([]);

    useEffect(() => {
        async function fetchProjects() {
            const response = await fetch("https://api.sujal.info/portfolio/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ type: "display" })
            });
            const data = await response.json();
            setProjects(data);
        }

        fetchProjects();
    }, []);
    return (
        <div className="bg-background mt-4 dark:bg-black text-white flex flex-col items-center justify-center">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          projectName={project.projectName}
          projectDescription={project.projectDescription}
          projectImg={project.projectImg}
          projectDemo={project.projectDemo}
          projectSourceCode={project.projectSourceCode}
          isLive={project.isLive}
          isSourceCode={project.isSourceCode}
        />
      ))}
  </div>
</div>


    )
  }
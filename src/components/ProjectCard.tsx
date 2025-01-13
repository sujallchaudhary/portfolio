"use client";

import Image from "next/image";
import React from "react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import Link from "next/link";
import TypingAnimation from "./ui/typing-animation";
import InteractiveHoverButton from "./ui/interactive-hover-button";
import RippleButton from "./ui/ripple-button";

interface ProjectCardProps {
    projectName:string;
    projectDescription:string;
    projectImg:string;
    projectDemo:string;
    projectSourceCode:string;
    isLive:string;
    isSourceCode:string;
}

export function ProjectCard({projectName,projectDescription,projectImg,projectDemo,projectSourceCode,isLive,isSourceCode}:ProjectCardProps) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-8 border">
        <CardItem
          translateZ="50">
          <TypingAnimation duration={60} className="text-xl font-bold text-neutral-600 dark:text-primary" startOnView={true}>
            {projectName}
          </TypingAnimation>
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={projectImg}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-gray-400"
        >
          {projectDescription}
        </CardItem>
        <div className="flex justify-between items-center mt-5">
        {isLive ? (
              <CardItem
                translateZ={20}
                as={Link}
                href={projectDemo}
                target="_blank"
              >
                <InteractiveHoverButton text="try now"/>
              </CardItem>
            ) : null}
{isSourceCode==="1" ? (
              <CardItem
                translateZ={20}
                as={Link}
                href={projectSourceCode}
                target="_blank"
              >
              <RippleButton rippleColor="bg-primary">Source code</RippleButton>
              </CardItem>
            ) : null}         
        </div>
      </CardBody>
    </CardContainer>
  );
}
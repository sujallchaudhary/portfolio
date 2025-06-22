"use client";
import HyperText from "./ui/hyper-text";
import SparklesText from "./ui/sparkles-text";
import { Lens } from "./ui/lens";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
export default function Hero() {
    const [hovering1, setHovering1] = useState(false);
    const [hovering2, setHovering2] = useState(false);

    return (
        <section className="bg-background text-white min-h-screen mb-12 flex items-center justify-center px-6 dark:bg-dot-white/[0.3] bg-dot-black/[0.2]">
             <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="max-w-5xl w-full">
                <motion.div
                    animate={{
                        filter: hovering1 || hovering2 ? "blur(2px)" : "blur(0px)",
                    }}
                >

                    <div className="text-center mb-8">
                        <HyperText className="text-sm mt-2 uppercase text-gray-400 tracking-widest">Web Developer</HyperText>
                        <SparklesText sparklesCount={4} text="SUJAL" className="md:text-[250px] text-8xl font-bold uppercase text-primary tracking-tight" />
                    </div>

                    <div className="flex justify-between items-center text-xs uppercase text-gray-400 mb-10">
                        <HyperText startOnView={true} className="text-sm uppercase text-gray-400 mb-10">Curious</HyperText>
                        <HyperText startOnView={true} className="text-sm uppercase text-gray-400 mb-10">Techie</HyperText>
                        <HyperText startOnView={true} className="text-sm uppercase text-gray-400 mb-10">Innovative</HyperText>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative col-span-2">
                        <Lens lensSize={200} hovering={hovering1} setHovering={setHovering1}>
                            <Image
                                src="https://hajiriresource.blob.core.windows.net/drive/files/82f8897dbd50ce35a317cbce07f8d274.jpg"
                                alt="Left image"
                                className="w-full h-96 object-cover border-2 border-primary"
                                height={1080}
                                width={1920}
                            />
                        </Lens>
                    </div>

                    <div className="relative col-span-1">
                        <Lens lensSize={180} hovering={hovering2} setHovering={setHovering2}>
                            <Image
                                src="/hero2.jpg"
                                alt="Right image"
                                className="w-full h-96 hidden md:flex object-cover border-primary border-2"
                                height={400}
                                width={400}
                            />
                        </Lens>

                    </div>
                </div>
            </div>
        </section>
    );
}
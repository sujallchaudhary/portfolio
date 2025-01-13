"use client";
import React from "react";
import {IconLocation,IconMail,IconPhone} from '@tabler/icons-react'
import { Input } from './ui/input'
import Label from './ui/label'
import { cn } from '@/lib/utils'
import { Textarea } from "./ui/textArea";
import InteractiveHoverButton from "./ui/interactive-hover-button";
import Link from "next/link";
import { TextAnimate } from "./ui/text-animate";

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-1 w-full", className)}>
      {children}
    </div>
  );
};
export default function Contact() {
    return (
        <section className="bg-background dark:bg-black py-12 bg-grid-small-white/[0.3] relative">
                  <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
                <TextAnimate className="text-4xl font-bold text-primary mb-4 uppercase" animation="scaleUp" by="text"> Let's Connect </TextAnimate>
                <p className="text-gray-700 dark:text-gray-300 mb-8">
                    I am always open to discussing product design work or partnership opportunities.
                </p>
              <div>
  <div className="mb-4">
    <div className="flex items-center mb-1">
      <IconLocation className="w-6 h-6 text-primary" />
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 ml-2">
        Location
      </h3>
    </div>
    <div className="text-gray-700 dark:text-gray-300 ml-8">
      <p>India</p>
    </div>
  </div>

  <div className="mb-4">
    <div className="flex items-center mb-1">
      <IconMail className="w-6 h-6 text-primary" />
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 ml-2">
        Email
      </h3>
    </div>
    <div className="text-gray-700 dark:text-gray-300 ml-8">
      <p>
        <Link href="https://sujal.info/email">me@sujal.info</Link>
      </p>
    </div>
  </div>

  <div className="mb-4">
    <div className="flex items-center mb-1">
      <IconPhone className="w-6 h-6 text-primary" />
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 ml-2">
        Phone
      </h3>
    </div>
    <div className="text-gray-700 dark:text-gray-300 ml-8">
      <Link href="https://sujal.info/phone">+91-9667835044</Link>
    </div>
  </div>
</div>

            </div>
  
            <div className="bg-white dark:bg-black shadow-md rounded-lg p-6 border dark:border-gray-800">
              <form
                action="https://formspree.io/f/your-form-id" // Replace with your form endpoint
                method="POST"
              >
                <div className="mb-4">
                    
                    <LabelInputContainer>
            <Label className="text-lg" htmlFor="firstname">Name</Label>
            <Input id="firstname" placeholder="Your Name" type="text" />
          </LabelInputContainer>
                </div>
                <div className="mb-4">
                <LabelInputContainer>
            <Label className="text-lg" htmlFor="email">Email</Label>
            <Input id="email" placeholder="Your Email" type="text" />
          </LabelInputContainer>
                </div>
                <div className="mb-4">
                <LabelInputContainer>
            <Label className="text-lg" htmlFor="phone">PhoneNo</Label>
            <Input id="phone" placeholder="Your PhoneNumber" type="number" />
            </LabelInputContainer>
</div>
                <div className="mb-4">
                <LabelInputContainer>
            <Label className="text-lg" htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Subject of Message" type="text" />
            </LabelInputContainer>
</div>
                <div className="mb-4">
                <LabelInputContainer>
            <Label className="text-lg" htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Type Message here..." rows={5} />
            </LabelInputContainer>
                </div>
                <InteractiveHoverButton text="Send Message" className="w-full rounded-2xl" />
                
              </form>
            </div>
          </div>
        </div>
      </section>
    )
};
"use client";
import React, { useState } from "react";
import { IconLocation, IconMail, IconPhone } from "@tabler/icons-react";
import { Input } from "./ui/input";
import Label from "./ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textArea";
import InteractiveHoverButton from "./ui/interactive-hover-button";
import Link from "next/link";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.name === "" || formData.email === "" || formData.phoneNo === "" || formData.subject === "" || formData.message === "") {
      setSubmissionMessage("Please fill all the fields.");
      return;
    }
    setIsSubmitting(true);
    setSubmissionMessage("");

    try {
      const response = await fetch("https://api.sujal.info/api/portfolio/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionMessage("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phoneNo: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmissionMessage("Failed to send the message. Please try again.");
      }
    } catch (error) {
      setSubmissionMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-background dark:bg-black py-12 bg-grid-small-white/[0.3] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-primary mb-4 uppercase">Let's Connect</h2>
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
                  <Link href="https://sujal.info/phone">+919667835044</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-black shadow-md rounded-lg p-6 border dark:border-gray-800">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <LabelInputContainer>
                  <Label className="text-lg" htmlFor="name">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </LabelInputContainer>
              </div>
              <div className="mb-4">
                <LabelInputContainer>
                  <Label className="text-lg" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="Your Email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </LabelInputContainer>
              </div>
              <div className="mb-4">
                <LabelInputContainer>
                  <Label className="text-lg" htmlFor="phoneNo">
                    Phone No
                  </Label>
                  <Input
                    id="phoneNo"
                    placeholder="Your Phone Number"
                    type="number"
                    value={formData.phoneNo}
                    onChange={handleChange}
                  />
                </LabelInputContainer>
              </div>
              <div className="mb-4">
                <LabelInputContainer>
                  <Label className="text-lg" htmlFor="subject">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Subject of Message"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </LabelInputContainer>
              </div>
              <div className="mb-4">
                <LabelInputContainer>
                  <Label className="text-lg" htmlFor="message">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Type Message here..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </LabelInputContainer>
              </div>
              <InteractiveHoverButton
                text={isSubmitting ? "Sending..." : "Send Message"}
                className="w-full rounded-2xl"
                disabled={isSubmitting}
              />
            </form>
            {submissionMessage && (
              <p
                className={`mt-4 text-center ${
                  submissionMessage.includes("successfully")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {submissionMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

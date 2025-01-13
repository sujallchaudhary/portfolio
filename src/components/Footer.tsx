import {IconBrandLinkedin,IconBrandInstagram,IconBrandGithub,IconBrandWhatsapp,IconBrandTelegram} from '@tabler/icons-react'
import { TextAnimate } from "./ui/text-animate";
import Link from 'next/link';
export default function Footer() {
  const year = new Date().getFullYear();
    return (
      <footer className="bg-black text-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-700">
          <div className="md:text-[200px] text-8xl font-bold uppercase text-primary tracking-tight text-center bg-dot-white/[0.3] relative">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(circle_at_center,transparent_20%,black)]"></div>
          <TextAnimate animation="scaleUp" by="text">
            SUJAL
          </TextAnimate>
          </div>

          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between">
            <div className="mt-4 md:mt-0 text-sm text-gray-400">
              © {year} Sujal. All Rights Reserved.
            </div>
            <div className="flex gap-4">
              <Link target='_blank' href="https://sujal.info/linkedin">
              <IconBrandLinkedin className="w-6 h-6 text-gray-400 hover:text-primary"/>
              </Link>
              <Link target='_blank' href="https://sujal.info/instagram">
              <IconBrandInstagram className="w-6 h-6 text-gray-400 hover:text-primary"/>
              </Link>
              <Link target='_blank' href="https://sujal.info/github">
              <IconBrandGithub className="w-6 h-6 text-gray-400 hover:text-primary"/>
              </Link>
              <Link target='_blank' href="https://sujal.info/whatsapp">
              <IconBrandWhatsapp className="w-6 h-6 text-gray-400 hover:text-primary"/>
              </Link>
              <Link target='_blank' href="https://sujal.info/telegram">
              <IconBrandTelegram className="w-6 h-6 text-gray-400 hover:text-primary"/>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
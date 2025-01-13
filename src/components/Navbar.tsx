"use client";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem,NavbarMenuToggle,NavbarMenu,NavbarMenuItem,Link} from "@nextui-org/react";
import HyperText from "./ui/hyper-text";
import React from "react";

export const Logo = () => {
  return (
    <img className="rounded-full" src="https://sdrive.blr1.cdn.digitaloceanspaces.com/files/4cfb797bd42593aaf2b981960f6966d3.gif" alt="ACME logo" width="32" height="32" />
  );
};
interface HyperTextNavBarProps {
  word: string;
}

export const HyperTextNavBar: React.FC<HyperTextNavBarProps> = ({ word }) => {
  return (
    <HyperText className="text-2xl text-primary">{word}</HyperText>
  );
};

export default function MainNavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand>
        <Link href="/">
        <Logo />
        <HyperText className="text-3xl ml-2 text-primary">Sujal</HyperText>
        </Link>
      </NavbarBrand>
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link color="foreground" href="#">
            <HyperTextNavBar word="Home"/>
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="foreground" href="#">
          <HyperTextNavBar word="About"/>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            <HyperTextNavBar word="Projects"/>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            <HyperTextNavBar word="Blog"/>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            <HyperTextNavBar word="Contact"/>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="#"><HyperTextNavBar word="home"/></Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#"><HyperTextNavBar word="about"/></Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#"><HyperTextNavBar word="projects"/></Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#"><HyperTextNavBar word="blog"/></Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#"><HyperTextNavBar word="contact"/></Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

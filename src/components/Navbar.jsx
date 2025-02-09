"use client";
import React from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Menu, Mountain, Bell, User } from "lucide-react";

const Navbar = () => {
  const { user, isLoading } = useUser();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="flex h-20 items-center px-4 md:px-6 max-w-7xl mx-auto">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-blue-800"
            >
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-slate-900">
            <div className="flex flex-col gap-6 py-6">
              <Link
                href="/"
                className="flex items-center text-lg font-bold text-white"
              >
                <Mountain className="h-6 w-6 mr-2 text-blue-500" />
                Smart Ambulance
              </Link>
              <nav className="flex flex-col gap-4">
                <NavLinks className="flex flex-col gap-4" />
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center text-lg font-bold text-white hover:opacity-80 transition-opacity"
        >
          <Mountain className="h-6 w-6 mr-2 text-blue-400" />
          <span className="hidden sm:inline">Smart Ambulance</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="ml-10 hidden lg:flex items-center gap-2">
          <NavLinks className="flex gap-2" />
        </nav>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex hover:bg-blue-800"
          >
            <Bell className="h-5 w-5 text-white" />
          </Button>

          {/* User Section */}
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900">
              <User className="h-4 w-4 text-white" />
              <Link
              href={"/dashboard"}
              >
              
              </Link>
              <span className="text-sm font-medium text-white">
                {user.name}
              </span>
            </div>
          )}
          {/* Auth Button */}
          {isLoading ? (
            <Button disabled className="min-w-[100px] bg-gray-700">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Loading
            </Button>
          ) : user ? (
            <Link href="/api/auth/logout">
              <Button className="bg-red-600 hover:bg-red-700 shadow-md transition-all">
                Logout
              </Button>
            </Link>
          ) : (
            <Link href="/api/auth/login?returnTo=/register-new">
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-md transition-all">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

const NavLinks = ({ className }) => {
  const links = [
    { href: "/predict-response-time", label: "Response Time" },
    { href: "/health-dashboard", label: "Dashboard" },
    { href: "/medical-profile", label: "Medical Profile" },
  ];

  return (
    <div className={className}>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-blue-800 transition-all"
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;

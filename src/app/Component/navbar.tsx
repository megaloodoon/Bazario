"use client";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { useShoppingCartContext } from "../context/ShoppingCartContext";
import Search from "./Search";
import Cookies from "js-cookie";


const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // On mount, check localStorage or system preference
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const pathname = usePathname();

  const { cartTotalQty } = useShoppingCartContext();

  const navLinks = [
    { href: "/", title: "Home" },
    { href: "/store", title: "Store" },
    { href: "/dashboard", title: "Dashboard" },
    { href: "/Login", title: "Login" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/10 border-b border-white/10">
      <Container>
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-400 to-cyan-300">
            Pari Store
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-4">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors duration-200 ${pathname === item.href
                    ? "text-indigo-300 bg-white/10"
                    : "text-slate-200 hover:text-white hover:bg-white/10"
                  }`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Cart */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-rose-600/80 text-white rounded-full text-xs">
              {cartTotalQty}
            </span>
            <Link
              href="/cart"
              className="text-sm font-medium text-slate-200 hover:text-white transition-colors duration-200"
            >
              Cart
            </Link>

            <button onClick={() => {
              Cookies.remove("token");
              redirect("/");
            }} className="px-5 py-2 rounded-2xl font-medium shadow-lg transition-transform transform hover:translate-y-0.5 active:scale-95 bg-red-600
            text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900 cursor-pointer">Logout</button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;

"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

/**
 * Renders the global Navbar on every route except the immersive reader,
 * which provides its own top toolbar.
 */
export function ConditionalNavbar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/read/")) return null;
  return <Navbar />;
}

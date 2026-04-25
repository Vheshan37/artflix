"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[18px] h-[18px] opacity-0" />; // skeleton placeholder
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center p-2 text-platinum/60 hover:text-gold transition-colors duration-300 group"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <div className="relative w-[18px] h-[18px]">
        <Sun
          className="absolute inset-0 h-[18px] w-[18px] transition-all duration-500 scale-100 rotate-0 dark:-rotate-90 dark:scale-0 dark:opacity-0 origin-center"
          strokeWidth={1.5}
        />
        <Moon
          className="absolute inset-0 h-[18px] w-[18px] transition-all duration-500 scale-0 rotate-90 dark:rotate-0 dark:scale-100 dark:opacity-100 origin-center"
          strokeWidth={1.5}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

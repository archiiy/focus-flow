import { useEffect, useState } from "react";

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("focusquest-theme");
    return saved ? saved === "dark" : true; // default dark
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("focusquest-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return { isDark, toggle };
};

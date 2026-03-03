interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="pixel-btn-secondary text-[0.5rem] flex items-center gap-2"
      aria-label="Toggle theme"
    >
      <span>{isDark ? "🌙" : "☀️"}</span>
      <span>{isDark ? "ARCADE" : "SOFT"}</span>
    </button>
  );
};

export default ThemeToggle;

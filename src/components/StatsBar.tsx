import { SessionStats } from "@/hooks/useFocusSession";

interface StatsBarProps {
  stats: SessionStats;
}

const StatsBar = ({ stats }: StatsBarProps) => {
  const xpPercent = Math.min(100, (stats.currentXp / stats.xpToNextLevel) * 100);

  return (
    <div className="pixel-card mb-6">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 pixel-border flex items-center justify-center bg-muted">
            <span className="font-pixel text-sm text-accent glow-text-accent">
              {stats.level}
            </span>
          </div>
          <div>
            <p className="font-pixel text-[0.6rem] text-muted-foreground">LEVEL</p>
            <p className="font-pixel text-xs text-foreground glow-text">
              Focus Warrior
            </p>
          </div>
        </div>

        <div className="flex gap-6 text-center">
          <div>
            <p className="font-pixel text-lg text-accent glow-text-accent">{stats.streak}</p>
            <p className="font-pixel text-[0.5rem] text-muted-foreground">STREAK 🔥</p>
          </div>
          <div>
            <p className="font-pixel text-lg text-secondary glow-text-cyan">{stats.todaySessions}</p>
            <p className="font-pixel text-[0.5rem] text-muted-foreground">TODAY</p>
          </div>
          <div>
            <p className="font-pixel text-lg text-foreground glow-text">{stats.totalSessions}</p>
            <p className="font-pixel text-[0.5rem] text-muted-foreground">TOTAL</p>
          </div>
          <div>
            <p className="font-pixel text-lg text-foreground glow-text">{stats.totalFocusMinutes}m</p>
            <p className="font-pixel text-[0.5rem] text-muted-foreground">FOCUSED</p>
          </div>
        </div>
      </div>

      {/* XP Bar */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="font-pixel text-[0.5rem] text-muted-foreground">
            XP: {stats.currentXp}/{stats.xpToNextLevel}
          </span>
          <span className="font-pixel text-[0.5rem] text-muted-foreground">
            TOTAL: {stats.totalXp} XP
          </span>
        </div>
        <div className="xp-bar">
          <div className="xp-bar-fill" style={{ width: `${xpPercent}%` }} />
        </div>
      </div>
    </div>
  );
};

export default StatsBar;

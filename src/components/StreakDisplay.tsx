import { SessionStats } from "@/hooks/useFocusSession";

interface StreakDisplayProps {
  stats: SessionStats;
}

const StreakDisplay = ({ stats }: StreakDisplayProps) => {
  const flames = Array.from({ length: Math.min(stats.streak, 7) }, (_, i) => i);

  return (
    <div className="pixel-card">
      <h3 className="font-pixel text-[0.6rem] text-muted-foreground mb-3 text-center">
        ◈ STREAK FIRE ◈
      </h3>
      <div className="flex justify-center gap-1 mb-2">
        {flames.length > 0 ? (
          flames.map((i) => (
            <span key={i} className="text-xl">🔥</span>
          ))
        ) : (
          <span className="text-xl">❄️</span>
        )}
        {stats.streak > 7 && (
          <span className="font-pixel text-[0.5rem] text-accent self-center ml-1">
            +{stats.streak - 7}
          </span>
        )}
      </div>
      <p className="font-pixel text-center text-[0.5rem] text-muted-foreground">
        BEST: {stats.bestStreak} 🏅
      </p>
    </div>
  );
};

export default StreakDisplay;

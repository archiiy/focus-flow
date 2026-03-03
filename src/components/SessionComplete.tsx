import { SessionType } from "@/hooks/useFocusSession";

interface SessionCompleteProps {
  session: SessionType;
  phonePicks: number;
  onDismiss: () => void;
}

const SessionComplete = ({ session, phonePicks, onDismiss }: SessionCompleteProps) => {
  const phonePenalty = phonePicks > 0 ? Math.max(0.3, 1 - phonePicks * 0.15) : 1;
  const bonusMultiplier = phonePicks === 0 ? 1.5 : 1;
  const earnedXp = Math.round(session.xpReward * phonePenalty * bonusMultiplier);
  const perfect = phonePicks === 0;

  return (
    <div className="text-center">
      <div className="pixel-card max-w-md mx-auto">
        <p className="font-pixel text-2xl mb-2">{perfect ? "🏆" : "✅"}</p>
        <h2 className="font-pixel text-sm text-accent glow-text-accent mb-4">
          {perfect ? "PERFECT FOCUS!" : "QUEST COMPLETE!"}
        </h2>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between pixel-border p-2 bg-muted/30">
            <span className="font-pixel text-[0.5rem] text-muted-foreground">SESSION</span>
            <span className="font-pixel text-[0.55rem] text-foreground">{session.name}</span>
          </div>
          <div className="flex justify-between pixel-border p-2 bg-muted/30">
            <span className="font-pixel text-[0.5rem] text-muted-foreground">DURATION</span>
            <span className="font-pixel text-[0.55rem] text-foreground">{session.duration} MIN</span>
          </div>
          <div className="flex justify-between pixel-border p-2 bg-muted/30">
            <span className="font-pixel text-[0.5rem] text-muted-foreground">PHONE PICKS</span>
            <span className={`font-pixel text-[0.55rem] ${phonePicks === 0 ? "text-primary" : "text-destructive"}`}>
              {phonePicks} {phonePicks === 0 ? "✓" : "✗"}
            </span>
          </div>
          {perfect && (
            <div className="flex justify-between pixel-border-accent p-2 bg-muted/30">
              <span className="font-pixel text-[0.5rem] text-accent">PERFECT BONUS</span>
              <span className="font-pixel text-[0.55rem] text-accent">×1.5</span>
            </div>
          )}
          <div className="flex justify-between pixel-border p-2 bg-primary/10">
            <span className="font-pixel text-[0.5rem] text-primary">XP EARNED</span>
            <span className="font-pixel text-sm text-primary glow-text">+{earnedXp}</span>
          </div>
        </div>

        <button onClick={onDismiss} className="pixel-btn">
          Continue →
        </button>
      </div>
    </div>
  );
};

export default SessionComplete;

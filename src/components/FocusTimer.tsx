import { SessionState, SessionType } from "@/hooks/useFocusSession";

interface FocusTimerProps {
  session: SessionType;
  timeRemaining: number;
  sessionState: SessionState;
  phoneDetected: boolean;
  sessionPhonePicks: number;
  onPause: () => void;
  onResume: () => void;
  onEnd: () => void;
  onSimulatePickup: () => void;
  onSimulatePlaceback: () => void;
}

const FocusTimer = ({
  session,
  timeRemaining,
  sessionState,
  phoneDetected,
  sessionPhonePicks,
  onPause,
  onResume,
  onEnd,
  onSimulatePickup,
  onSimulatePlaceback,
}: FocusTimerProps) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const totalSeconds = session.duration * 60;
  const progress = ((totalSeconds - timeRemaining) / totalSeconds) * 100;

  return (
    <div className="text-center">
      <h2 className="font-pixel text-sm text-foreground glow-text mb-2">
        {session.icon} {session.name}
      </h2>
      <p className="font-pixel text-[0.5rem] text-muted-foreground mb-6">
        {sessionState === "running" ? "FOCUSING..." : sessionState === "paused" ? "PAUSED" : "READY"}
      </p>

      {/* Timer Display */}
      <div className={`pixel-card inline-block px-10 py-8 mb-6 ${phoneDetected ? "border-destructive animate-pulse-danger" : sessionState === "running" ? "animate-pulse-glow" : ""}`}>
        <p className="font-pixel text-4xl text-foreground glow-text tracking-widest">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto mb-6">
        <div className="xp-bar">
          <div
            className="xp-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-pixel text-[0.5rem] text-muted-foreground mt-1">
          {Math.round(progress)}% COMPLETE
        </p>
      </div>

      {/* Phone Detection Indicator */}
      <div className={`pixel-card mb-6 max-w-md mx-auto ${phoneDetected ? "border-destructive" : "border-border"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{phoneDetected ? "📱" : "📵"}</span>
            <div className="text-left">
              <p className="font-pixel text-[0.55rem]" style={{ color: phoneDetected ? "hsl(var(--destructive))" : "hsl(var(--primary))" }}>
                {phoneDetected ? "⚠ PHONE DETECTED!" : "✓ PHONE DOWN"}
              </p>
              <p className="font-pixel text-[0.45rem] text-muted-foreground">
                Pickups this session: {sessionPhonePicks}
              </p>
            </div>
          </div>
          <div className={`w-3 h-3 ${phoneDetected ? "bg-destructive animate-blink" : "bg-primary"}`} />
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center flex-wrap">
        {sessionState === "running" && (
          <button onClick={onPause} className="pixel-btn-secondary">
            ⏸ Pause
          </button>
        )}
        {sessionState === "paused" && !phoneDetected && (
          <button onClick={onResume} className="pixel-btn">
            ▶ Resume
          </button>
        )}
        <button onClick={onEnd} className="pixel-btn-secondary">
          ✕ End
        </button>
      </div>

      {/* Hardware Simulation */}
      <div className="mt-8 pixel-card max-w-md mx-auto bg-muted/50">
        <p className="font-pixel text-[0.5rem] text-muted-foreground mb-3">
          ◈ HARDWARE SIM ◈
        </p>
        <div className="flex gap-3 justify-center">
          {!phoneDetected ? (
            <button onClick={onSimulatePickup} className="pixel-btn-accent text-[0.5rem]">
              📱 Pick Up Phone
            </button>
          ) : (
            <button onClick={onSimulatePlaceback} className="pixel-btn text-[0.5rem]">
              📵 Place Phone Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;

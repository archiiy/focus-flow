import { SESSION_TYPES, SessionType } from "@/hooks/useFocusSession";

interface SessionPickerProps {
  onSelect: (session: SessionType) => void;
}

const SessionPicker = ({ onSelect }: SessionPickerProps) => {
  return (
    <div>
      <h2 className="font-pixel text-sm text-foreground glow-text mb-4 text-center">
        ▸ Choose Your Quest ◂
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SESSION_TYPES.map((session) => (
          <button
            key={session.name}
            onClick={() => onSelect(session)}
            className="pixel-card group hover:border-accent transition-colors text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{session.icon}</span>
              <div>
                <p className="font-pixel text-[0.65rem] text-foreground group-hover:text-accent transition-colors">
                  {session.name}
                </p>
                <p className="font-pixel text-[0.5rem] text-muted-foreground">
                  {session.duration} MIN
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-pixel text-[0.5rem] text-accent">
                +{session.xpReward} XP
              </span>
              <span className="font-pixel text-[0.5rem] text-muted-foreground group-hover:text-foreground transition-colors">
                START →
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SessionPicker;

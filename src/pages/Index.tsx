import { useFocusSession } from "@/hooks/useFocusSession";
import StatsBar from "@/components/StatsBar";
import SessionPicker from "@/components/SessionPicker";
import FocusTimer from "@/components/FocusTimer";
import SessionComplete from "@/components/SessionComplete";
import StreakDisplay from "@/components/StreakDisplay";

const Index = () => {
  const {
    stats,
    sessionState,
    activeSession,
    timeRemaining,
    phoneDetected,
    sessionPhonePicks,
    startSession,
    pauseSession,
    resumeSession,
    endSession,
    simulatePhonePickup,
    simulatePhonePlaceback,
    resetSession,
  } = useFocusSession();

  return (
    <div className="min-h-screen bg-background scanline">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="font-pixel text-xl text-foreground glow-text mb-1 tracking-wider">
            FOCUSQUEST
          </h1>
          <p className="font-pixel text-[0.5rem] text-muted-foreground">
            ▸ DEFEAT DISTRACTION. LEVEL UP. ◂
          </p>
        </header>

        {/* Stats Bar */}
        <StatsBar stats={stats} />

        {/* Main Content */}
        <div className="mb-6">
          {sessionState === "idle" && (
            <SessionPicker onSelect={startSession} />
          )}

          {(sessionState === "running" || sessionState === "paused") && activeSession && (
            <FocusTimer
              session={activeSession}
              timeRemaining={timeRemaining}
              sessionState={sessionState}
              phoneDetected={phoneDetected}
              sessionPhonePicks={sessionPhonePicks}
              onPause={pauseSession}
              onResume={resumeSession}
              onEnd={endSession}
              onSimulatePickup={simulatePhonePickup}
              onSimulatePlaceback={simulatePhonePlaceback}
            />
          )}

          {sessionState === "completed" && activeSession && (
            <SessionComplete
              session={activeSession}
              phonePicks={sessionPhonePicks}
              onDismiss={resetSession}
            />
          )}
        </div>

        {/* Streak */}
        <StreakDisplay stats={stats} />

        {/* Footer */}
        <footer className="text-center mt-8">
          <p className="font-pixel text-[0.45rem] text-muted-foreground">
            ◈ HARDWARE SIGNAL VIA USB/BLE ◈ V1.0 ◈
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

import { useState, useCallback, useRef, useEffect } from "react";

export type SessionType = {
  name: string;
  duration: number; // minutes
  xpReward: number;
  icon: string;
};

export const SESSION_TYPES: SessionType[] = [
  { name: "Quick Focus", duration: 15, xpReward: 30, icon: "⚡" },
  { name: "Standard", duration: 25, xpReward: 60, icon: "🎯" },
  { name: "Deep Work", duration: 50, xpReward: 150, icon: "🧠" },
  { name: "Ultra Focus", duration: 90, xpReward: 300, icon: "🔥" },
];

export type SessionState = "idle" | "running" | "paused" | "completed";

export type SessionStats = {
  totalSessions: number;
  totalFocusMinutes: number;
  totalXp: number;
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  streak: number;
  bestStreak: number;
  todaySessions: number;
  phonePicks: number;
};

const XP_PER_LEVEL = 500;

const loadStats = (): SessionStats => {
  const saved = localStorage.getItem("focusquest-stats");
  if (saved) return JSON.parse(saved);
  return {
    totalSessions: 0,
    totalFocusMinutes: 0,
    totalXp: 0,
    level: 1,
    currentXp: 0,
    xpToNextLevel: XP_PER_LEVEL,
    streak: 0,
    bestStreak: 0,
    todaySessions: 0,
    phonePicks: 0,
  };
};

const saveStats = (stats: SessionStats) => {
  localStorage.setItem("focusquest-stats", JSON.stringify(stats));
};

export const useFocusSession = () => {
  const [stats, setStats] = useState<SessionStats>(loadStats);
  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [activeSession, setActiveSession] = useState<SessionType | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [phoneDetected, setPhoneDetected] = useState(false);
  const [sessionPhonePicks, setSessionPhonePicks] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (sessionState === "running" && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearTimer();
            setSessionState("completed");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return clearTimer;
  }, [sessionState, timeRemaining > 0]);

  useEffect(() => {
    if (sessionState === "completed" && activeSession) {
      const phonePenalty = sessionPhonePicks > 0 ? Math.max(0.3, 1 - sessionPhonePicks * 0.15) : 1;
      const bonusMultiplier = sessionPhonePicks === 0 ? 1.5 : 1;
      const earnedXp = Math.round(activeSession.xpReward * phonePenalty * bonusMultiplier);

      setStats((prev) => {
        let newXp = prev.currentXp + earnedXp;
        let newLevel = prev.level;
        let xpToNext = prev.xpToNextLevel;

        while (newXp >= xpToNext) {
          newXp -= xpToNext;
          newLevel++;
          xpToNext = XP_PER_LEVEL + (newLevel - 1) * 100;
        }

        const newStreak = prev.streak + 1;
        const updated: SessionStats = {
          ...prev,
          totalSessions: prev.totalSessions + 1,
          totalFocusMinutes: prev.totalFocusMinutes + activeSession.duration,
          totalXp: prev.totalXp + earnedXp,
          level: newLevel,
          currentXp: newXp,
          xpToNextLevel: xpToNext,
          streak: newStreak,
          bestStreak: Math.max(prev.bestStreak, newStreak),
          todaySessions: prev.todaySessions + 1,
          phonePicks: prev.phonePicks + sessionPhonePicks,
        };
        saveStats(updated);
        return updated;
      });
    }
  }, [sessionState]);

  const startSession = useCallback((session: SessionType) => {
    setActiveSession(session);
    setTimeRemaining(session.duration * 60);
    setSessionState("running");
    setPhoneDetected(false);
    setSessionPhonePicks(0);
  }, []);

  const pauseSession = useCallback(() => {
    clearTimer();
    setSessionState("paused");
  }, []);

  const resumeSession = useCallback(() => {
    setSessionState("running");
  }, []);

  const endSession = useCallback(() => {
    clearTimer();
    setSessionState("idle");
    setActiveSession(null);
    setTimeRemaining(0);
    setPhoneDetected(false);
    setSessionPhonePicks(0);
  }, []);

  const simulatePhonePickup = useCallback(() => {
    if (sessionState === "running") {
      setPhoneDetected(true);
      setSessionPhonePicks((p) => p + 1);
      clearTimer();
      setSessionState("paused");
    }
  }, [sessionState]);

  const simulatePhonePlaceback = useCallback(() => {
    if (phoneDetected) {
      setPhoneDetected(false);
      setSessionState("running");
    }
  }, [phoneDetected]);

  const resetSession = useCallback(() => {
    clearTimer();
    setSessionState("idle");
    setActiveSession(null);
    setTimeRemaining(0);
    setPhoneDetected(false);
    setSessionPhonePicks(0);
  }, []);

  return {
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
  };
};

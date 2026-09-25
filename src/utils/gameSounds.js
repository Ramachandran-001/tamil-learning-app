const NOTES = {
  correct: [660, 880],
  complete: [523, 659, 784],
};

export const playGameSound = (kind = "correct") => {
  if (typeof window === "undefined") return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  try {
    const context = new AudioContext();
    const notes = NOTES[kind] || NOTES.correct;
    const startAt = context.currentTime;
    const noteDuration = 0.11;

    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const noteStart = startAt + index * noteDuration;
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.045, noteStart + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteStart + noteDuration);
    });

    window.setTimeout(
      () => context.close().catch(() => {}),
      notes.length * noteDuration + 80,
    );
  } catch {
    // Sound effects are optional; learning continues if audio is unavailable.
  }
};

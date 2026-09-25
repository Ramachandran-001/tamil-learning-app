import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Sparkles, Music } from "lucide-react";

export const TamilAudioPlayer = ({
  poemTitleTamil,
  authorTamil,
  recitationText,
  titleTamil,
  author,
  poemLines,
  manappadam = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.9);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [audioSupported, setAudioSupported] = useState(true);

  const displayTitle = titleTamil || poemTitleTamil || "";
  const displayAuthor = author || authorTamil || "";

  const lines =
    poemLines && poemLines.length > 0
      ? poemLines
      : (recitationText || "")
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 0);

  const synthRef = useRef(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    } else {
      setAudioSupported(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const playChimeTone = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch {
      // AudioContext fallback
    }
  };

  const startRecitation = (startFromIndex = 0) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    playChimeTone();

    let index = startFromIndex;
    const reciteNextLine = () => {
      if (index >= lines.length) {
        setIsPlaying(false);
        setCurrentLineIndex(-1);
        return;
      }

      setCurrentLineIndex(index);
      const lineText = lines[index];
      const utterance = new SpeechSynthesisUtterance(lineText);
      utterance.lang = "ta-IN";
      utterance.rate = playbackSpeed;
      utterance.pitch = 1.05;

      utterance.onend = () => {
        index++;
        if (index < lines.length) {
          setTimeout(() => {
            reciteNextLine();
          }, 350);
        } else {
          setIsPlaying(false);
          setCurrentLineIndex(-1);
        }
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setCurrentLineIndex(-1);
      };

      utteranceRef.current = utterance;
      synthRef.current?.speak(utterance);
    };

    setIsPlaying(true);
    reciteNextLine();
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      setIsPlaying(false);
    } else {
      startRecitation(currentLineIndex >= 0 ? currentLineIndex : 0);
    }
  };

  const handleRestart = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    startRecitation(0);
  };

  const toggleSpeed = () => {
    const nextSpeed =
      playbackSpeed === 0.75 ? 0.9 : playbackSpeed === 0.9 ? 1.1 : 0.75;
    setPlaybackSpeed(nextSpeed);
    if (isPlaying) {
      if (synthRef.current) synthRef.current.cancel();
      startRecitation(currentLineIndex >= 0 ? currentLineIndex : 0);
    }
  };

  return (
    <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white p-5 shadow-xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -right-8 -top-8 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-8 -bottom-8 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-start justify-between relative z-10 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                ஒலிவழி மனப்பாடப் பயிற்சி
              </span>
              {manappadam && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold">
                  ★ மனப்பாடப் பகுதி
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-white font-serif">
              {displayTitle}
            </h3>
            <p className="text-xs text-slate-300">ஆசிரியர்: {displayAuthor}</p>
          </div>
        </div>

        {/* Speed button */}
        <button
          onClick={toggleSpeed}
          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-emerald-200 transition cursor-pointer"
          title="ஒலியின் வேகத்தை மாற்று"
        >
          {playbackSpeed}x வேகம்
        </button>
      </div>

      {/* Lyrics / Verse Lines with synchronized highlight */}
      <div className="bg-black/30 border border-white/10 rounded-xl p-4 my-4 max-h-56 overflow-y-auto space-y-2 font-serif text-sm">
        {lines.map((line, idx) => {
          const isCurrent = currentLineIndex === idx;
          return (
            <div
              key={idx}
              onClick={() => {
                if (synthRef.current) synthRef.current.cancel();
                startRecitation(idx);
              }}
              className={`p-2 rounded-lg cursor-pointer transition-all duration-200 flex items-start gap-2.5 ${
                isCurrent
                  ? "bg-emerald-500/30 border border-emerald-400/60 text-emerald-200 font-bold scale-[1.01] shadow-xs"
                  : "hover:bg-white/5 text-slate-300"
              }`}
            >
              <span className="text-[10px] font-mono text-slate-400 w-4 text-right pt-0.5 shrink-0">
                {idx + 1}
              </span>
              <span className="leading-relaxed flex-1">{line}</span>
              {isCurrent && (
                <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-1 animate-spin" />
              )}
            </div>
          );
        })}
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10 relative z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePlay}
            className="w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            aria-label={isPlaying ? "இடைநிறுத்து" : "இயக்கு"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>
          <button
            onClick={handleRestart}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition cursor-pointer"
            title="மீண்டும் தொடங்கு"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-slate-400 block">
            {isPlaying
              ? `${lines.length} வரிகளில் ${currentLineIndex + 1}-ஆம் வரி ஒலிக்கிறது`
              : "எந்த வரியிலிருந்தும் ஒலிப்பயிற்சியைத் தொடங்க அதைத் தொடுங்கள்"}
          </span>
        </div>
      </div>
    </div>
  );
};

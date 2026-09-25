import React, { useState } from "react";
import { useUserProgress } from "../../context/UserProgressContext";
import { BadgeCard } from "../../components/gamification/BadgeCard";

import { Modal } from "../../components/common/Modal";
import { Button } from "../../components/common/Button";
import { Sparkles } from "lucide-react";

export const BadgesPage = () => {
  const { badges, progress } = useUserProgress();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBadge, setSelectedBadge] = useState(null);

  const unlockedCount = progress.unlockedBadgeIds.length;
  const totalBadges = badges.length;

  const filteredBadges =
    selectedCategory === "all"
      ? badges
      : badges.filter((b) => b.category === selectedCategory);

  return (
    <div className="space-y-6 text-left pb-12">
      {/* 1. HEADER */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-700 text-white p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>மாணவர் சாதனை அரங்கம்</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
              சாதனைப் பதக்கங்கள் (Achievement Badges)
            </h1>
            <p className="text-xs sm:text-sm text-amber-50 leading-relaxed">
              பாடங்களை முடிக்கும்போதும், தொடர் கற்றலை நிலைநிறுத்தும்போதும்,
              மாதிரிப் பொதுத்தேர்வுகளில் சிறக்கும்போதும் பிரத்யேக பதக்கங்களைப்
              பெறுங்கள்.
            </p>
          </div>

          <div className="shrink-0 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center min-w-[180px]">
            <span className="text-xs text-amber-100 font-semibold block mb-1">
              பெற்ற பதக்கங்கள்
            </span>
            <span className="text-3xl font-black font-mono text-white">
              {unlockedCount} / {totalBadges}
            </span>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY FILTERS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            selectedCategory === "all"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          அனைத்துப் பதக்கங்கள் ({badges.length})
        </button>
        <button
          onClick={() => setSelectedCategory("starter")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            selectedCategory === "starter"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          தொடக்க நிலை (Starter)
        </button>
        <button
          onClick={() => setSelectedCategory("streak")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            selectedCategory === "streak"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          தொடர் சாதனை (Streaks)
        </button>
        <button
          onClick={() => setSelectedCategory("mastery")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            selectedCategory === "mastery"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          இலக்கணத் தேர்ச்சி (Mastery)
        </button>
        <button
          onClick={() => setSelectedCategory("exam")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            selectedCategory === "exam"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          பொதுத்தேர்வு சிற்பி (Exams)
        </button>
      </div>

      {/* 3. BADGES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map((badge) => {
          const isUnlocked = progress.unlockedBadgeIds.includes(badge.id);
          return (
            <BadgeCard
              key={badge.id}
              badge={badge}
              isUnlocked={isUnlocked}
              onClick={() => setSelectedBadge(badge)}
            />
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedBadge && (
        <Modal
          isOpen={!!selectedBadge}
          onClose={() => setSelectedBadge(null)}
          title={selectedBadge.titleEnglish}
          titleTamil={selectedBadge.titleTamil}
          maxWidth="sm"
        >
          <div className="space-y-4 text-left text-xs">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-bold uppercase tracking-wider text-[11px] text-amber-800">
                  {selectedBadge.category} பிரிவு
                </span>
                {progress.unlockedBadgeIds.includes(selectedBadge.id) ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                    ✓ பெற்றீர்கள்
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                    பூட்டப்பட்டது
                  </span>
                )}
              </div>
              <p className="text-sm font-bold text-slate-900 font-serif mb-1">
                {selectedBadge.titleTamil}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {selectedBadge.descriptionTamil}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">
                பதக்கம் பெறுவதற்கான விதி:
              </span>
              <p className="text-slate-600">{selectedBadge.requirementText}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedBadge(null)}
              >
                புரிந்தது
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

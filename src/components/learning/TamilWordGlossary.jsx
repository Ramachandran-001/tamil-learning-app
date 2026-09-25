import React, { useState } from "react";

import { BookOpen, Volume2 } from "lucide-react";
import { Modal } from "../common/Modal";

export const TamilWordGlossary = ({ glossaryTerms, words, title }) => {
  const terms = words || glossaryTerms || [];
  const [selectedWord, setSelectedWord] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTerms = terms.filter(
    (term) =>
      term.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.meaning.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const speakTamilWord = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ta-IN";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full">
      {/* Search and chip view */}
      <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-sans flex items-center gap-1.5">
                {title || "சொற்களும் பொருள்களும்"}
                <span className="text-[11px] font-normal text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full font-mono">
                  {terms.length} சொற்கள்
                </span>
              </h4>
              <p className="text-xs text-slate-600">
                சொல்லைத் தொட்டு அதன் பொருள், வேர்ச்சொல், உச்சரிப்பைக் காணுங்கள்
              </p>
            </div>
          </div>
        </div>

        {/* Word Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {terms.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedWord(item);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-950 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 shadow-xs transition-all cursor-pointer group active:scale-95"
            >
              <span>{item.word}</span>
              <span className="text-[10px] opacity-70 group-hover:text-emerald-100 font-normal">
                →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Word Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="சொல்லின் பொருள்"
        titleTamil={selectedWord ? `சொல்: ${selectedWord.word}` : "சொற்பொருள்"}
        maxWidth="md"
        footer={
          <div className="w-full flex items-center justify-between">
            <button
              onClick={() => selectedWord && speakTamilWord(selectedWord.word)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-medium hover:bg-emerald-200 transition cursor-pointer"
            >
              <Volume2 className="w-4 h-4" /> உச்சரிப்பைக் கேள்
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-medium hover:bg-slate-900 transition cursor-pointer"
            >
              மூடு
            </button>
          </div>
        }
      >
        {selectedWord && (
          <div className="space-y-4 text-left">
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs font-bold tracking-wider text-emerald-800 uppercase">
                  பொருள்
                </span>
                {selectedWord.partOfSpeech && (
                  <span className="text-[11px] font-medium text-slate-500 bg-white/80 px-2 py-0.5 rounded-md">
                    {selectedWord.partOfSpeech}
                  </span>
                )}
              </div>
              <p className="text-base font-bold text-slate-900 font-serif leading-relaxed">
                {selectedWord.meaning}
              </p>
            </div>

            {selectedWord.synonyms && selectedWord.synonyms.length > 0 && (
              <div>
                <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Synonyms (இணைச் சொற்கள்)
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedWord.synonyms.map((syn, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-medium"
                    >
                      {syn}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedWord.rootWord && (
              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/60 text-xs text-amber-900">
                <span className="font-bold">
                  வேர்ச்சொல்: {" "}
                </span>
                <span>{selectedWord.rootWord}</span>
              </div>
            )}

            {selectedWord.contextSentence && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">
                  பயன்பாடு:
                </span>
                <p className="italic text-slate-800 font-serif">
                  "{selectedWord.contextSentence}"
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

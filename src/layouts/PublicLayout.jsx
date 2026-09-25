import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { BookOpen, Heart } from "lucide-react";

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            <div className="md:col-span-2 space-y-3 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-white font-serif">
                  StudyPath
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                பத்தாம் வகுப்பு தமிழ் வழி மாணவர்களுக்கான முழுமையான டிஜிட்டல்
                கல்வி தளம். தமிழ்நாடு அரசுப் பாடநூல் அடிப்படையிலான சொல் பொருள்
                விளக்கம், குரல் ஓசை, இலக்கணப் பயிற்சி மற்றும் கால அளவிடப்பட்ட
                தேர்வுகள்.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60">
                  தமிழ்நாடு மாநிலப் பாடத்திட்டம் (TN State Board)
                </span>
              </div>
            </div>

            <div className="text-left space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                வழிகாட்டல் (Links)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>
                  <Link to="/" className="hover:text-emerald-400 transition">
                    முகப்பு
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works"
                    className="hover:text-emerald-400 transition"
                  >
                    எப்படி இயங்குகிறது?
                  </Link>
                </li>
                <li>
                  <Link
                    to="/subjects"
                    className="hover:text-emerald-400 transition"
                  >
                    பாடங்கள்
                  </Link>
                </li>
                <li>
                  <Link
                    to="/learning/subjects/tamil"
                    className="hover:text-emerald-400 transition"
                  >
                    10-ஆம் தமிழ் மையம்
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-left space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                மாணவர் களம் (Access)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>
                  <Link
                    to="/login"
                    className="hover:text-emerald-400 transition"
                  >
                    மாணவர் உள்நுழைவு
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-emerald-400 transition"
                  >
                    புதிய கணக்கு பதிவு
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-emerald-400 transition"
                  >
                    மாணவர் தளம்
                  </Link>
                </li>
                <li>
                  <Link
                    to="/practice/tamil/tamil-unit-1"
                    className="hover:text-emerald-400 transition"
                  >
                    பயிற்சி வினாடி வினா
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © 2026 StudyPath Architecture. பத்தாம் வகுப்பு மாணவர்களுக்கான
              பிரத்யேக கல்வி தளம்.
            </p>
            <p className="flex items-center gap-1">
              தமிழ் மொழியின் செழுமையுடன் உருவாக்கப்பட்டது{" "}
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

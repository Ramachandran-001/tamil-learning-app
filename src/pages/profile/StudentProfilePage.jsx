import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUserProgress } from "../../context/UserProgressContext";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { User, Mail, Save } from "lucide-react";

export const StudentProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { progress, resetProgress } = useUserProgress();

  const [fullName, setFullName] = useState(
    user?.fullName || "அரவிந்த் கார்த்திகேயன்",
  );
  const [email, setEmail] = useState(
    user?.email || "aravind.10th@studypath.tn.gov.in",
  );
  const [studentClass, setStudentClass] = useState(
    user?.studentClass || "10-ஆம் வகுப்பு (தமிழ் வழி)",
  );
  const [schoolName, setSchoolName] = useState(
    user?.schoolName || "அரசு மேல்நிலைப் பள்ளி, மதுரை",
  );
  const [district, setDistrict] = useState(user?.district || "மதுரை");
  const [saved, setSaved] = useState(false);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSpeechSpeed, setAutoSpeechSpeed] = useState("1.0");

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      fullName,
      email,
      studentClass,
      schoolName,
      district,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left pb-16">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          மாணவர் சுயவிவரம்
        </span>
        <h1 className="text-2xl font-bold text-slate-900 font-serif">
          சுயவிவரம் & அமைப்புகள் (Profile & Settings)
        </h1>
      </div>

      {/* Profile Info Form */}
      <Card variant="default" className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-emerald-600/20">
            {fullName.slice(0, 2)}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-serif">
              {fullName}
            </h2>
            <p className="text-xs text-slate-500">
              {studentClass} • {district}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                {progress.totalXp} XP புள்ளிகள்
              </span>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                {progress.currentStreak} நாட்கள் தொடர் சாதனை
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="முழுப் பெயர் (Full Name)"
              icon={<User className="w-4 h-4" />}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <Input
              label="மின்னஞ்சல் முகவரி (Email)"
              type="email"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                வகுப்பு (Class)
              </label>
              <input
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition font-serif"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                பள்ளிப் பெயர் (School Name)
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition font-serif"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                மாவட்டம் (District)
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition font-serif"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span>
              {saved && (
                <span className="text-xs font-bold text-emerald-600">
                  ✓ விவரங்கள் வெற்றிகரமாக சேமிக்கப்பட்டன!
                </span>
              )}
            </span>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Save className="w-4 h-4" />}
            >
              மாற்றங்களைச் சேமி
            </Button>
          </div>
        </form>
      </Card>

      {/* Learning Preferences */}
      <Card variant="default" className="p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 font-serif border-b border-slate-100 pb-2">
          கற்றல் விருப்ப அமைப்புகள் (Audio & Sound Preferences)
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="font-bold text-slate-800 block">
                வெற்றி ஒலி விளைவுகள் (Sound Effects)
              </span>
              <p className="text-slate-500">
                சரியான விடைகள் மற்றும் பதக்கம் அன்லாக் செய்யும்போது ஒலி
                எழுப்பும்
              </p>
            </div>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="font-bold text-slate-800 block">
                இயல்புநிலை குரல் வேகம் (Default Voice Speed)
              </span>
              <p className="text-slate-500">செய்யுள் வாசிப்பு இயல்பு வேகம்</p>
            </div>
            <select
              value={autoSpeechSpeed}
              onChange={(e) => setAutoSpeechSpeed(e.target.value)}
              className="rounded-lg border border-slate-300 p-1 text-xs"
            >
              <option value="0.8">0.8x (மெதுவாக)</option>
              <option value="1.0">1.0x (சரியான வேகம்)</option>
              <option value="1.2">1.2x (வேகமாக)</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );
};

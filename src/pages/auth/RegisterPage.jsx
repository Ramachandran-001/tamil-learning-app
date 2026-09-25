import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { BookOpen, UserPlus, Mail, Lock, User } from "lucide-react";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [studentClass, setStudentClass] = useState(
    "10-ஆம் வகுப்பு (தமிழ் வழி)",
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError("Please fill in all required fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      await register(fullName, email, studentClass, password);
      navigate("/dashboard");
    } catch {
      setError("Account registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
              StudyPath
            </span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900 font-sans">
            Create Student Account
          </h2>
          <p className="text-xs text-slate-500">
            Join Tamil Medium 10th Standard Digital Learning Portal
          </p>
        </div>

        <Card variant="default" className="p-6 sm:p-8 text-left">
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            <Input
              label="Full Name"
              placeholder="e.g. Aravind Kumar"
              icon={<User className="w-4 h-4" />}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="student@example.com"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Class Selection */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Grade & Curriculum
              </label>
              <div className="relative">
                <select
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition"
                >
                  <option value="10-ஆம் வகுப்பு (தமிழ் வழி)">
                    10th Standard (Tamil Medium - தமிழ்நாடு பாடத்திட்டம்)
                  </option>
                  <option value="10th Standard (English Medium)">
                    10th Standard (English Medium)
                  </option>
                  <option value="9-ஆம் வகுப்பு">9th Standard (Class 9)</option>
                  <option value="11-ஆம் வகுப்பு">
                    11th Standard (Class 11)
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
              icon={<UserPlus className="w-4 h-4" />}
            >
              Register & Start Learning
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="font-bold text-emerald-700 hover:text-emerald-800"
            >
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

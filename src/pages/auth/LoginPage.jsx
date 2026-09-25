import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { BookOpen, LogIn, Mail, Lock } from "lucide-react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("aravind.10th@studypath.tn.gov.in");
  const [password, setPassword] = useState("pass1234");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        {/* Brand */}
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
            Student Login
          </h2>
          <p className="text-xs text-slate-500">
            Sign in to your 10th Grade Tamil Medium learning portal
          </p>
        </div>

        <Card variant="default" className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              placeholder="student@example.com"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              icon={<LogIn className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              New to StudyPath?{" "}
              <Link
                to="/register"
                className="font-bold text-emerald-700 hover:text-emerald-800"
              >
                Create an account
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { BookOpen, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6 text-left">
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
            Password Recovery
          </h2>
          <p className="text-xs text-slate-500">
            Enter your registered email address to receive reset link
          </p>
        </div>

        <Card variant="default" className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center space-y-4 py-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Recovery Link Sent!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A password reset instructions link has been sent to{" "}
                <strong className="text-slate-900">{email}</strong>. Please
                check your inbox.
              </p>
              <div className="pt-3">
                <Link to="/login">
                  <Button variant="primary" size="md" className="w-full">
                    Return to Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered Email Address"
                type="email"
                placeholder="student@example.com"
                icon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Send Password Reset Link
              </Button>

              <div className="pt-2 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Student Login</span>
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

import React, { createContext, useContext, useState, useEffect } from "react";

const DEFAULT_USER = {
  id: "student-1001",
  fullName: "செல்வன். அரவிந்தன்",
  email: "aravind.10th@studypath.tn.gov.in",
  studentClass: "10-ஆம் வகுப்பு (தமிழ் வழி)",
  schoolName: "அரசு மாதிரி மேல்நிலைப் பள்ளி, சென்னை",
  district: "சென்னை",
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  joinedDate: "2026-06-15",
};

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("studypath_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("studypath_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("studypath_user");
    }
  }, [user]);

  const login = async (email) => {
    // Client-side authentication simulation with persistence
    const existing = localStorage.getItem("studypath_user");
    let loggedUser = DEFAULT_USER;
    if (existing) {
      try {
        loggedUser = { ...JSON.parse(existing), email };
      } catch {
        loggedUser = { ...DEFAULT_USER, email };
      }
    } else {
      loggedUser = { ...DEFAULT_USER, email };
    }
    setUser(loggedUser);
    return true;
  };

  const register = async (name, email, studentClass) => {
    const newUser = {
      id: "student-" + Math.floor(Math.random() * 9000 + 1000),
      fullName: name,
      email: email,
      studentClass: studentClass || "10-ஆம் வகுப்பு (தமிழ் வழி)",
      schoolName: "அரசு மேல்நிலைப் பள்ளி",
      district: "தமிழ்நாடு",
      joinedDate: new Date().toISOString().split("T")[0],
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    if (!user) return;
    setUser({ ...user, ...updates });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// src/components/SplashScreen.jsx
import React, { useState, useEffect } from "react";

const SplashScreen = ({ onFinish }) => {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  
  const languages = [
    { text: "Welcome to ARQA" },
    { text: "ARQA में आपका स्वागत है" }, // Hindi
    { text: "ARQA க்கு வரவேற்கிறோம்" }, // Tamil
    { text: "ARQA కు స్వాగతం" }, // Telugu
    { text: "ARQA ಗೆ ಸುಸ್ವಾಗತ" }, // Kannada
    { text: "ARQA സ്വാഗതം" }, // Malayalam
    { text: "ARQA ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ" }, // Punjabi
    { text: "ARQA তে স্বাগতম" } // Bengali
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % languages.length);
    }, 500);
    
    const timeout = setTimeout(() => {
      clearInterval(interval);
      onFinish();
    }, 4000); // Total duration of splash screen

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [languages.length, onFinish]);

  return (
    <div className="fixed inset-0 bg-orange-500 flex items-center justify-center z-50">
      <h1 className="text-white text-4xl md:text-6xl font-bold text-center px-4 animate-pulse">
        {languages[currentLanguage].text}
      </h1>
    </div>
  );
};

export default SplashScreen;
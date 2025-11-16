// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [xp, setXP] = useState(0);
  const [lastScore, setLastScore] = useState(null);
  const [level, setLevel] = useState(1);
  const navigate = useNavigate();

  // simple level logic based on XP
  function getLevelFromXP(xpValue) {
    if (xpValue >= 70) return 3;
    if (xpValue >= 30) return 2;
    return 1;
  }

  useEffect(() => {
    const savedXP = localStorage.getItem("mochimindXP");
    const savedScore = localStorage.getItem("mochimindLastScore");

    const xpValue = savedXP ? parseInt(savedXP) : 0;
    setXP(xpValue);
    setLevel(getLevelFromXP(xpValue));

    if (savedScore) setLastScore(parseInt(savedScore));
  }, []);

  const handleNewQuiz = () => {
    navigate("/");
  };

  const handleViewQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dash-title">🍡 Mochi Dashboard</h1>
        <p className="dash-subtitle">Track your learning progress!</p>

        {/* Mochi Avatar (emoji version for now) */}
        <div className="mochi-avatar">
          {level === 1 && "🌱"}
          {level === 2 && "✨"}
          {level === 3 && "🌟"}
        </div>

        <h2 className="level-text">Level {level}</h2>

        <p className="progress-text">
          {level === 3
            ? "Maxed out! 🌈 Your Mochi is fully evolved!"
            : `XP to next level: ${
                level === 1 ? 30 - xp : 70 - xp
              }`}
        </p>

        <div className="xp-box">
          <strong>Total XP:</strong> {xp}
        </div>

        <div className="stats">
          <h3>Your Stats</h3>
          <p>
            Last Quiz Score:{" "}
            {lastScore !== null ? `${lastScore} correct` : "No quiz yet"}
          </p>
        </div>

        <div className="button-row">
          <button className="secondary-btn" onClick={handleViewQuiz}>
            View Last Quiz
          </button>
          <button className="primary-btn" onClick={handleNewQuiz}>
            Upload New Notes
          </button>
        </div>
      </div>
    </div>
  );
}

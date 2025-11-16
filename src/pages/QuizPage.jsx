// src/pages/QuizPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizPage() {
  const [quiz, setQuiz] = useState([]);
  const [selected, setSelected] = useState({});
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("mochimindQuiz");
    if (stored) {
      setQuiz(JSON.parse(stored));
    } else {
      navigate("/"); // no quiz → go back to upload
    }
  }, [navigate]);

  const handleSelect = (qIndex, optionIndex) => {
    setSelected((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.forEach((q, i) => {
      if (selected[i] === q.correctIndex) correct++;
    });

    setScore(correct);
    const xp = correct * 10;
    localStorage.setItem("mochimindXP", xp.toString());
  };

  const handleGoDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="mm-page">
      <div className="mm-card">
        <h1 className="mm-title">📚 Quiz Time</h1>
        <p className="mm-subtitle">
          Answer the questions to help your Mochi grow!
        </p>

        {quiz.length === 0 && (
          <p className="mm-subtitle">Loading quiz…</p>
        )}

        {quiz.map((q, i) => (
          <div key={i} className="mm-question-card">
            <p className="mm-question-text">
              {i + 1}. {q.question}
            </p>
            <div className="mm-options-row">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  className={
                    "mm-option-btn" +
                    (selected[i] === idx ? " mm-option-selected" : "")
                  }
                  onClick={() => handleSelect(i, idx)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        {quiz.length > 0 && (
          <button className="mm-primary-btn" onClick={handleSubmit}>
            Submit Quiz
          </button>
        )}
        

        {score !== null && (
          <div className="mm-result-box">
            <p>
              You got <strong>{score}</strong> out of{" "}
              <strong>{quiz.length}</strong> correct!
            </p>
            <p>Your Mochi earned {score * 10} XP ✨</p>
            <button className="mm-secondary-btn" onClick={handleGoDashboard}>
              View Mochi Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


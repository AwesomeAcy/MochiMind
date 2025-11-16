import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadPage.css";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleGenerateQuiz = () => {
    // temporary fake quiz for demo
    const sampleQuiz = [
      {
        question: "What is AI?",
        options: ["A robot", "A field of study", "A video game"],
        correctIndex: 1,
      },
      {
        question: "What does HTML stand for?",
        options: [
          "HyperText Markup Language",
          "How To Make Lasagna",
          "Hot Mail",
        ],
        correctIndex: 0,
      },
    ];

    localStorage.setItem("mochimindQuiz", JSON.stringify(sampleQuiz));
    navigate("/quiz");
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h1 className="logo">🍡 MochiMind</h1>
        <p className="subtitle">
          Upload your notes to generate a quiz and help your Mochi grow!
        </p>

        <div className="mochi-box">(◕‿◕✿) I’m ready to study with you!</div>

        <label className="file-input">
          <span>{file ? file.name : "Choose a PDF or notes file"}</span>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <button className="primary-btn" onClick={handleGenerateQuiz}>
          Generate Quiz
        </button>

        <p className="demo-note">
          (For the demo, this uses sample quiz data.  
          Later this will call the real AI backend.)
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { quizData } from "../data/quizData";
import ScoreSegment from "./ProgressBar";
import filledStar from "../assets/filledStar.png";
import emptyStar from "../assets/emptyStar.png";
function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerClick = (answer) => {
    if (answered.includes(currentQuestion)) return;

    const isCorrect = answer === quizData[currentQuestion].correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswer(answer);
    setAnswered([...answered, currentQuestion]);

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
      }
    }, 1000);
  };

  const renderStars = (difficulty) => {
    let starCount = difficulty === "hard" ? 3  : difficulty === "medium" ? 2 : 1;
  
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < starCount ? "star-filled" : "star-empty"}`}>
          {i < starCount ? <img src={filledStar} alt="filled star" /> : <img src={emptyStar} alt="empty star" />}
        </span>
      );
    }
    return stars;
  };
  

  const calculateProgress = () =>
    ((currentQuestion + 1) / quizData.length) * 100;
  const calculateCurrentScore = () =>
    answered.length === 0 ? 0 : (score / answered.length) * 100;
  const calculateMinPossibleScore = () => (score / quizData.length) * 100;
  const calculateMaxPossibleScore = () =>
    ((score + (quizData.length - answered.length)) / quizData.length) * 100;

  return (
    <div className="quiz-container">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>

      <div className="question-header">
        <h2>
          Question {currentQuestion + 1} of {quizData.length}
        </h2>
        <p className="category">{quizData[currentQuestion].category}</p>
        <div className="difficulty-stars">
          {renderStars(quizData[currentQuestion].difficulty)}
        </div>
      </div>

      <div className="question">
        <p>{quizData[currentQuestion].question}</p>
      </div>

      <div className="answer-options">
        {[
          ...quizData[currentQuestion].incorrect_answers,
          quizData[currentQuestion].correct_answer,
        ]
          .map((option, index) => (
            <button
              key={index}
              className={`answer-button ${
                selectedAnswer === option
                  ? option === quizData[currentQuestion].correct_answer
                    ? "correct"
                    : "incorrect"
                  : ""
              }`}
              onClick={() => handleAnswerClick(option)}
              disabled={answered.includes(currentQuestion)}
            >
              {option}
            </button>
          ))}
      </div>

      <div className="score-display">
        <div className="score-labels">
          <span>Score: {calculateCurrentScore().toFixed(0)}%</span>
          <span>Max Score: {calculateMaxPossibleScore().toFixed(0)}%</span>
        </div>
        <div className="score-bar">
          <div className="flex">
            <ScoreSegment
              width={calculateMinPossibleScore()}
              className="min-score"
            />
            <ScoreSegment
              width={calculateCurrentScore() - calculateMinPossibleScore()}
              className="current-score"
            />
            <ScoreSegment
              width={calculateMaxPossibleScore() - calculateCurrentScore()}
              className="max-score"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizApp;

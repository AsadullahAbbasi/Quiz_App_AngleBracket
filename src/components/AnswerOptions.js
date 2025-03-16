function AnswerOptions({ options, correctAnswer, selectedAnswer, answered, onAnswerClick }) {
  return (
    <div className="answer-options">
      {options.map((option, index) => (
        <button
          key={index}
          className={`answer-button ${
            selectedAnswer === option ? (option === correctAnswer ? "correct" : "incorrect") : ""
          }`}
          onClick={() => onAnswerClick(option)}
          disabled={answered}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default AnswerOptions


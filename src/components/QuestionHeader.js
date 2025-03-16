function QuestionHeader({
  questionNumber,
  totalQuestions,
  category,
  difficulty,
}) {
  const renderStars = (difficulty) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i < difficulty ? "star-filled" : "star-empty"}`}
        >
          {i < difficulty ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="question-header">
      <h2>
        Question {questionNumber} of {totalQuestions}
      </h2>
      <p className="category">{category}</p>
      <div className="difficulty-stars">{renderStars(difficulty)}</div>
    </div>
  );
}

export default QuestionHeader;

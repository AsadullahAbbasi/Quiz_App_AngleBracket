function ScoreDisplay({ currentScore, maxScore }) {
  const currentScoreWidth = `${currentScore}%`
  const maxScoreWidth = `${maxScore - currentScore}%`
  const remainingWidth = `${100 - maxScore}%`

  return (
    <div className="score-display">
      <div className="score-labels">
        <span>Score: {currentScore.toFixed(0)}%</span>
        <span>Max Score: {maxScore.toFixed(0)}%</span>
      </div>
      <div className="score-bar">
        <div className="flex">
          <div className="current-score" style={{ width: currentScoreWidth }}></div>
          <div className="max-score" style={{ width: maxScoreWidth }}></div>
          <div className="remaining-score" style={{ width: remainingWidth }}></div>
        </div>
      </div>
    </div>
  )
}

export default ScoreDisplay


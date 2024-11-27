
export default function Score({timeLeft,score,historyScore,highestScoreFromDB,sumbangan}){
  return(
    <>
      <div className="papannilai" style={{ display: timeLeft > 0 || sumbangan == true ? "none" : "block" }}>
          <p>Your Score :</p>
          <p>{score}</p>
          <p>Highest score : {Math.max(...historyScore,highestScoreFromDB)}</p>
      </div>
      <div className="papanSelamat" style={{display: score > highestScoreFromDB && timeLeft <= 0 ? "block" : "none" }}>
      <p className="breakRecord">Congratulations, <br /> you break your records!!!</p>
      </div>
    </>
  )
}
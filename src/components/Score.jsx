export default function Score({timeLeft,score,historyScore}){
  return(
    <div className="papannilai" style={{ display: timeLeft > 0 ? "none" : "block" }}>
         <p>Your Score :</p>
         <p>{score}</p>
         <p>Highest score : {Math.max(...historyScore)}</p>
    </div>
  )
}
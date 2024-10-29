export default function Score({timeLeft,score,historyScore}){
  return(
    <div className="papannilai" style={{ display: timeLeft > 0 ? "none" : "block" }}>
         <p>Your Score :</p>
         <h1>{score}</h1>
         <h3>Highest score : {Math.max(...historyScore)}</h3>
    </div>
  )
}
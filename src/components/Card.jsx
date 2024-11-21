import '../assets/css/card.css'
import Score from "./Score";
import { useState,useEffect,useRef } from 'react';

export default function Card() {
const time = 60
const [historyScore,setHistoryScore] = useState([])
const [angka1,setAngka1] = useState(0)
const [angka2,setAngka2] = useState(0)
const [answer,setAnswer] = useState()
const [score,setScore] = useState(0)
const [kunciJawaban,setKunciJawaban] = useState(0)
const [timeLeft, setTimeLeft] = useState(time);
const inputJawaban = useRef(null);

const [jam,setJam] = useState(0)
const [menit,setMenit] = useState(0)
const [detik,setDetik] = useState(0)



  const enter = (e) => {
    if (e.key === "Enter") {
      if (answer == kunciJawaban) {
        setAnswer('')
        setScore(score+1)
        nextSoal()
      }
    }
  };

 function handleAnswerOnchange(e){
    setAnswer(e.target.value)
  }

  function mainLagi() {
    setTimeLeft(time)
    setAnswer('')
    setScore(0)
    nextSoal()
    setTimeout(() => {
      inputJawaban.current.focus()
    }, 1);
  }



  function nextSoal() {
    const soal1 = getRandomNumber()
    const soal2 = getRandomNumber()
    setAngka1(soal1)
    setAngka2(soal2)
    setKunciJawaban(soal1+soal2)
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }


  useEffect(()=>{
    const soal1 = getRandomNumber()
    const soal2 = getRandomNumber()
    setAngka1(soal1)
    setAngka2(soal2)
    setKunciJawaban(soal1+soal2)

    
  },[])



  useEffect(() => {
    if (timeLeft <= 0) {
      setHistoryScore((prevHistoryScore)=>[...prevHistoryScore,score])
      return; 
    }
    
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft,score]);


  useEffect(() => {
    setJam(Math.floor(timeLeft / 3600));
    setMenit(Math.floor((timeLeft % 3600) / 60));
    setDetik(timeLeft % 60);
  }, [timeLeft]);


  return (
    <div>
      <Score timeLeft={timeLeft} score={score} historyScore={historyScore}/>
    <div className="tampah"  style={{ display: timeLeft <= 0 ? "none" : "block" }}>
      <table style={{'border':'black'}}>
        <thead>
          <tr>
            <td><p>score : {score}</p></td>
            <td style={{'padding-left':'105px','text-align':'right'}}><p>{jam}:{menit}:{detik}</p></td>
          </tr>
        </thead>
      </table>
    
      <div className="papan_soal">
        <h2>{angka1}+{angka2}</h2>
      </div>

      <div className="papan_jawaban">
        <input type="number" value={answer} autoFocus onKeyDown={enter} onChange={handleAnswerOnchange} ref={inputJawaban}/>
      </div>

    </div>
    <button style={{ display: timeLeft <= 0 ? "block" : "none" }} onClick={mainLagi}>Coba Lagi</button>
    </div>
  )
};

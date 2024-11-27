import '../assets/css/card.css'
import Score from "./Score";
import Email from "./Email"
import axios from "axios"
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
const [sudahInputEmail, setSudahInputEmail] = useState(false)
const [highestScoreFromDB, setHighestScoreFromDB] = useState(0)
const [emailUser, setEmailUser] = useState('')



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
    // jika waktu habis
    if (timeLeft <= 0) {
      // masukkan score ke history score
      setHistoryScore((prevHistoryScore)=>[...prevHistoryScore,score])
      // jika score saat ini lebih besar dari score dari database, maka insert ke database rekor baru yang terpecahkan tersebut
      if (score > highestScoreFromDB) {
        axios.post('https://otwjepang.my.id/api/insertemailtambahtambahan',
          {
            email:emailUser,
            score:score
          }
        )
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      return; 
    }
    
    if (sudahInputEmail && timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
  
      return () => clearInterval(intervalId);
      
    }

    if (!sudahInputEmail) {
      setTimeLeft(time); // Reset timer ketika email belum dimasukkan
    }


  }, [timeLeft,score,sudahInputEmail]);


  useEffect(() => {
    setJam(Math.floor(timeLeft / 3600));
    setMenit(Math.floor((timeLeft % 3600) / 60));
    setDetik(timeLeft % 60);
  }, [timeLeft]);


  return (
    <div>
      <Email setSudahInputEmail={setSudahInputEmail} sudahInputEmail={sudahInputEmail} highestScoreFromDB={highestScoreFromDB} setHighestScoreFromDB={setHighestScoreFromDB} mainLagi={mainLagi} setEmailUser={setEmailUser} emailUser={emailUser}/>
      <Score timeLeft={timeLeft} score={score} historyScore={historyScore} highestScoreFromDB={highestScoreFromDB}/>
    <div className="tampah"  style={{ display: timeLeft <= 0 || sudahInputEmail == false ? "none" : "block" }}>
      <table style={{'border':'black'}}>
        <thead>
          <tr>
            <td><p>score : {score}</p></td>
            <td style={{'paddingLeft':'105px','textAlign':'right'}}><p>{jam}:{menit}:{detik}</p></td>
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

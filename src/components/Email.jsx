import '../assets/css/email.css'
import { useState } from 'react';
import axios from 'axios';

export default function Email({setSudahInputEmail,sudahInputEmail,setHighestScoreFromDB,highestScoreFromDB,mainLagi,setEmailUser,emailUser}) {
  const [emailDikirim, setEmailDikirim] = useState(false)
  const [sambutan, setSambutan] = useState('')
  const [infoScore, setInfoScore] = useState('')
  

  const enter = (e) => {
    if (e.key === "Enter") {
      axios.post('http://127.0.0.1:8000/api/insertemailtambahtambahan',
        {
          email:emailUser,
          score:0
        }
      )
      .then(function (response) {
        setSambutan(response.data.message.sambutan)
        setInfoScore(response.data.message.info_skor)
        setHighestScoreFromDB(response.data.data.highest_score)
        setEmailUser(response.data.data.email)
        setEmailDikirim(true)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };

  return (
    <>
    <div className="papanEmail" style={{display : sudahInputEmail == true ? 'none' : 'block'}}>
      <div className="kasihTahuScore"  style={{display : emailDikirim == false ? 'none' : 'block'}}>
        <p className='masukkan'>{sambutan}</p>
        <p className='masukkan'>{infoScore} : {highestScoreFromDB}</p>
        <p className='closeButton' onClick={()=>{
          setSudahInputEmail(true)
          mainLagi()
          }}>X</p>
      </div>
      <div className="mintaEmail" style={{display : emailDikirim == false ? 'block' : 'none'}}>
      <p className='masukkan'>Masukkan E-mail Anda</p>
      <input type="email" placeholder='tekan enter jika sudah' id='emailUser' onChange={(e)=>{setEmailUser(e.target.value)}} onKeyDown={enter} value={emailUser}/>
      <p className='kegunaanemail'>email akan digunakan untuk membandingan <br /> score mu dengan top global game tambahtambahan</p>
      </div>
    </div>
    </>
  )

}
import '../assets/css/email.css'
import { useState } from 'react';
import axios from 'axios';

export default function Email({setSudahInputEmail,sudahInputEmail}) {
  const [emailInputanUser,setEmailInputanUser] = useState('')
  const [emailDikirim, setEmailDikirim] = useState(false)
  const [sambutan, setSambutan] = useState('')
  const [highestScore, setHighestScore] = useState('')
  const [infoScore, setInfoScore] = useState('')
  

  const enter = (e) => {
    if (e.key === "Enter") {
      axios.post('http://127.0.0.1:8000/api/insertemailtambahtambahan',
        {
          email:emailInputanUser,
          score:15
        }
      )
      .then(function (response) {
        console.log(response.data);
        setSambutan(response.data.message.sambutan)
        setInfoScore(response.data.message.info_skor)
        setHighestScore(response.data.data.highest_score)
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
        <p className='masukkan'>{infoScore} : {highestScore}</p>
        <p className='closeButton' onClick={()=>{setSudahInputEmail(true)}}>X</p>
      </div>
      <div className="mintaEmail" style={{display : emailDikirim == false ? 'block' : 'none'}}>
      <p className='masukkan'>Masukkan E-mail Anda</p>
      <input type="email" placeholder='tekan enter jika sudah' id='emailUser' onChange={(e)=>{setEmailInputanUser(e.target.value)}} onKeyDown={enter}/>
      <p className='kegunaanemail'>email akan digunakan untuk membandingan <br /> score mu dengan top global game tambahtambahan</p>
      </div>
    </div>
    </>
  )

}
import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import '../Componets/Maindev.css'
import { savehistory,gethistory } from '../utils/Savehistory'
import { useEffect } from 'react'


export default function Mainui() {

  const [history, sethistory] = useState([])
  


  const handleSave = async () => {
    console.log("api hit")
    
    if (!transcript) return

    const token = localStorage.getItem("token")

  if (!token) {
    alert(" Please login first")
    return
  }

    try {
      const res = await savehistory(transcript)
      console.log(res.data)
      

      alert("Saved ")

    } catch (error) {
      console.error(error)
    }
  }



  //transcript part
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US'
    });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='MContainer'>
      <h1>Speech to text</h1>
      <h4>Turn your voice into written text with one click.</h4>

      <div className='text'>
        <p>{transcript}</p>
      </div>

      <div>
        <button onClick={startListening}>Start</button>

        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <button onClick={() => navigator.clipboard.writeText(transcript)}>Copy</button>
        <button onClick={()=>handleSave()}>Save</button>
      </div>
    </div>
  )
}
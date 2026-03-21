import React, { useEffect, useState } from 'react'
import { gethistory ,deletehistory} from '../utils/Savehistory.js'
import '../Componets/History.css'

export default function History() {
    const [history, setHistory] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await gethistory()
                setHistory(res.data)
                
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])
    const handledelete=async(id)=>{
       try{
        
        await deletehistory(id)
        setHistory((prev) => prev.filter((item) => item._id !== id))
       }
       catch(e){
         alert("error occure in database")
       }
    }

    return (
        <div className="history-container">
            <h2 className="history-title">Your History</h2>

            {history.length === 0 ? (
                <p className="no-history">No history found</p>
            ) : (
                history.map((item) => (
                    <div className="history-card" key={item._id}>
                        <p className="history-text">{item.text}</p>
                        <small className="history-date">
                            {new Date(item.date).toLocaleString()}
                        </small>
                        <button className='delete-btn' onClick={()=>handledelete(item._id)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    )
}
import express from 'express'
import { register,login,saveHistory,getHistory ,deletetext} from '../Backend/autho_contoller.js'
import authMiddleware from '../Backend/jwttokenverify.js'


const Route=express.Router()

Route.post('/register',register)
Route.post('/login',login)
Route.post('/save', authMiddleware,saveHistory)
Route.get('/history', authMiddleware,getHistory)
Route.delete('/delete/:id',authMiddleware,deletetext)

export default Route
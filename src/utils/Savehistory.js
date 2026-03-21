import API from '../utils/api.js'

// SAVE HISTORY
export const savehistory = (text) => {
  return API.post('/save',{ text })
}

// GET HISTORY
export const gethistory = () => {
  return API.get('/history',gethistory)
}

//deleteing histroy
export const deletehistory=(id)=>{
  return API.delete(`delete/${id}`)
}
import User from '../Backend/usermodel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import History from '../Backend/historymodel.js'

export const register = async (req, res) => {
  const { name,email, password } = req.body

  const Useremail = await User.findOne({ email })
  if(Useremail){
    return res.status(400).json({
        message: "User already exists"
      });
    
  }

  const hash = await bcrypt.hash(password, 10)

  const user = new User({
    name,
    email,
    password: hash
  })

  await user.save()

  res.send('Registered successfully')
}


//login functions 

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.send('User not found')
  }

  const match = await bcrypt.compare(password, user.password)

  if (match) {
    const token = jwt.sign(
      { id: user._id },
      'secretkey'
    )

    res.json({
      message: 'Login successful',
      token,
       user: {
      
        name: user.name,
        email: user.email
      }
    })
  } else {
    res.send('Wrong password')
  }
}


// saving history
export const saveHistory = async (req, res) => {
  const { text } = req.body

  const history = new History({
    userId: req.user.id,
    text
  })

  await history.save()

  res.send('History saved')
}
//feching history
export const getHistory = async (req, res) => {
  const history = await History.find({
    userId: req.user.id
  })

  res.json(history)
}

//deleting 
export const deletetext=async(req,res)=>{
  const deleted=await History.findByIdAndDelete(req.params.id)
  if(!deleted){
    res.send("no record found..")
  }
  else{
    res.json(deleted)
  }
}
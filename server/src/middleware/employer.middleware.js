import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import redisClient from '../config/redis.config.js'


const authenticateEmployer = async (req, res, next)=>{

   try {
    
      const {Token} = req.cookies || {}


      if(!Token)
         return res.status(400).json({
            message: 'Unauthorized access'
         })

      const payload = jwt.verify(Token, process.env.SECRET_KEY)

      if(payload?.role != 'employer')
         return res.status(401).json({message: "you're not Employer"})

      const isBlocked = await redisClient.exists(`Token ${Token}`)
      if(isBlocked)
         return res.status(400).json({
            message:'Invalid Token'
         })

      const user = await User.findById(payload._id)
      req.user = user
        
      next()

   } catch (error) {
      return res.status(500).json({message: error.message})
   }
}

export default authenticateEmployer






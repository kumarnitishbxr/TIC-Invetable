import { validate } from '../Utils/Validate.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt';
// import redisClient from '../config/Redis.js';

export const Register = async (req, res) => {
    try{
        const { emailId, password, contact, Name} = req.body;

        if(!emailId || !password || !contact || !Name) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            })
        }

        const existingUser = await User.findOne({emailId});

        if(existingUser) return res.status(400).json({
            success: false,
            message: "User already exists."
        })

        const result = validate(req.body);
        if(!result.success) return res.status(500).json({
            message: result.message
        })

        req.body.password = await bcrypt.hash(password, 12);

        if(!process.env.SECRET_KEY || !process.env.JWT_EXP){
            throw new Error('JWT configuration missing');
        }

        const user = await User.create(req.body);

        const Token = jwt.sign({_id: user._id, role: user.role, emailId: user.emailId},process.env.SECRET_KEY,
        {expiresIn: process.env.JWT_EXP})

        res.status(201).json({
            Token,
            success: true,
            message: 'User registered successfully',
            userId: user._id,
            Name: user.Name,
            emailId: user.emailId,
            contact: user.contact,
            role: user.role
        })
    }catch(err){
        return res.status(500).json({
            message: "Register controller error: ",
            error: err.message
        })
    }
}

export const Login = async (req, res) => {

   try {
      const { emailId, password } = req.body;

      if (!emailId || !password) {
         return res.status(400).json({ 
            success: false, 
            message: 'Email and password are required' 
         });
      }
      console.log(emailId, password)

      const user = await User.findOne({ emailId });
      if (!user) {
         return res.status(401).json({ 
            success: false, 
            message: 'Invalid credentials' 
         });
      }

      const isMatched = await bcrypt.compare(password, user?.password);
      if (!isMatched) {
         return res.status(401).json({ 
            success: false, 
            message: 'Invalid credentials-pass' 
         });
      }


      if (!process.env.SECRET_KEY || !process.env.JWT_EXP) {
         throw new Error('JWT configuration missing');
      }

      const Token = jwt.sign(
         { _id: user._id, role: user.role, emailId: user.emailId },
         process.env.SECRET_KEY,
         { expiresIn: process.env.JWT_EXP }
      );

      res.cookie('Token', Token);

      res.status(201).json({
         Token,
         success: true,
         message: 'User logged in successfully',
         userId: user._id,
         firstName: user.firstName,
         lastName: user.lastName,
         emailId: user.emailId,
         contact: user.contact,
         role: user.role,
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Login failed',
         error: error.message,
      });
   }
};

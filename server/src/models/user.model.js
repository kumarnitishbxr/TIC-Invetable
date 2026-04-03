import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 25
   },
   contact: {
      type: Number,
      required: true,
      minLength: 10,
      unique: true,
   },
   emailId: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
   },
   password: {
      type: String,
      required: true,
      minLength: 6
   },
   aadhar: {
      type: Number,
      minLength: 12
   },
   role: {
      type: String,
      enum: ['user', 'employer', 'mediator', 'admin'],
      default: 'user',
      required: true
   },
   skills: {
      type: [String],
      default: []
   },
   verified: {
      type: Boolean,
      default: false
   },
   rating: {
      type: Number,
      default: 0
   },
   ratingCount: {
      type: Number,
      default: 0
   },
   isBlocked: {
      type: Boolean,
      default: false
   },
   location: {
      type: {
         type: String,
         enum: ['Point'],
         default: 'Point'
      },
      coordinates: {
         type: [Number],
         default: [0, 0]
      }
   },
   activeCases: {
      type: Number,
      default: 0
   }
}, { timestamps: true });

userSchema.index({ location: "2dsphere" });

const User = mongoose.model('User', userSchema);

export default User;
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      trim: true,
   },
   description: {
      type: String,
      required: true,
      trim: true,
   },
   category: {
      type: String,
      enum: ['General', 'Cleaning', 'Electrical', 'Plumbing', 'Painting', 'Other'],
      default: 'General',
   },
   employmentType: {
      type: String,
      enum: ['Part-time', 'Full-time'],
      default: 'Full-time',
   },
   wage: Number,
   salaryMin: Number,
   salaryMax: Number,
   payFrequency: {
      type: String,
      default: 'Daily',
   },
   experienceLevel: {
      type: String,
      enum: ['Entry Level', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Entry Level',
   },
   locationText: String,
   skills: {
      type: [String],
      default: [],
   },
   employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   },
   applicants: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
      },
   ],
   assignedEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   },
   status: {
      type: String,
      enum: ['open', 'pending', 'assigned', 'completed', 'cancelled'],
      default: 'open',
   },
   location: {
      type: {
         type: String,
         enum: ['Point'],
         default: 'Point',
      },
      coordinates: {
         type: [Number],
         default: [0, 0],
      },
   },
   applications: {
      type: [
         {
            applicant: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User',
            },
            fullName: String,
            contactNumber: String,
            experience: String,
            message: String,
            submittedAt: {
               type: Date,
               default: Date.now,
            },
         },
      ],
      default: [],
   },
   
}, { timestamps: true });

jobSchema.index({ location: '2dsphere' });
const Job = mongoose.model('Job', jobSchema);

export default Job;

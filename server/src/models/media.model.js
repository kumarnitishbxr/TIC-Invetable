import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
   {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
      type: { type: String, enum: ['image', 'video'], required: true },
      uploadedBy: {
         required: true,
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
      },
      jobId:{
         required:true,
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Job',
      }
   },
   { timestamps: true }
);

const Media = mongoose.model('Media', mediaSchema);
export default Media
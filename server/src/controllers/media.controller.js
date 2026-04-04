import uploadToCloudinary from '../utils/uploadToCloudinary.utils.js';
import Media from '../models/media.model.js';
import mongoose from 'mongoose';

export const uploadMedia = async (req, res) => {
   try {

      if (!req.file) {
         return res.status(400).json({ message: 'No file uploaded' });
      }

      const result = await uploadToCloudinary(req.file.buffer, 'mern_uploads');

      const mediaType = result.resource_type === 'video' ? 'video' : 'image';
      const media = await Media.create({
         url: result.secure_url,
         public_id: result.public_id,
         type: mediaType,
         jobId: req.params.jobId,
         uploadedBy: req.user?._id,
      });

      res.status(201).json({
         success: true,
         media,
      });

   } catch (error) {
      console.error(error);
      res.status(500).json({
         message: 'Upload failed',
         error: error.message,
      });
   }
};



export const getMediaByJob = async (req, res) => {
   try {
      const { jobId, page = 1, limit = 10 } = req.params;

      if (!jobId) {
         return res.status(400).json({ message: 'jobId is required' });
      }

      if (!mongoose.Types.ObjectId.isValid(jobId)) {
         return res.status(400).json({ message: 'Invalid jobId' });
      }

      const query = { jobId, uploadedBy: req.user._id };
      const skip = (Number(page) - 1) * Number(limit);

      const media = await Media.find({})
         .sort({ createdAt: -1 })
         .skip(skip)
         .limit(Number(limit))
         .select('url public_id type uploadedBy createdAt');

      const total = await Media.countDocuments(query);

      res.status(200).json({
         success: true,
         page: Number(page),
         total,
         count: media.length,
         data: media,
      });

   } catch (error) {
      res.status(500).json({
         message: 'Failed to fetch media',
         error: error.message,
      });
   }
};


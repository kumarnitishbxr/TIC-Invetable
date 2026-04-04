<<<<<<< HEAD
import { v2 as cloudinary } from "cloudinary";
=======
import { v2 as cloudinary } from 'cloudinary';
>>>>>>> e0a21d64242585bd4f51a3fc12dc9b503c6b93c0

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

<<<<<<< HEAD
=======

>>>>>>> e0a21d64242585bd4f51a3fc12dc9b503c6b93c0
export default cloudinary;
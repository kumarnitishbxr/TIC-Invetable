// server/src/middleware/upload.middleware.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";

// Cloudinary storage — files go directly to Cloudinary, no local disk needed
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Detect if file is video or image
    const isVideo = file.mimetype.startsWith("video/");
    return {
      folder: "tic-inventable/job-attachments",
      resource_type: isVideo ? "video" : "image",
      // Max 10 MB for images, 50 MB for videos — Cloudinary enforces on their side
      allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "avi"],
      transformation: isVideo
        ? []
        : [{ width: 1200, crop: "limit", quality: "auto" }],
    };
  },
});

// File size limits
const limits = {
  fileSize: 50 * 1024 * 1024, // 50 MB max
};

// File type filter — only images and videos
const fileFilter = (req, file, callback) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/quicktime", "video/avi"];
  if (allowed.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Only images (JPG, PNG, WEBP) and videos (MP4, MOV, AVI) are allowed"), false);
  }
};

// Single file upload — field name must be "attachment"
export const uploadSingle = multer({ storage, limits, fileFilter }).single("attachment");

// Middleware wrapper — handles multer errors gracefully
export const handleUpload = (req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (!err) return next();

    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File too large. Maximum size is 50 MB.",
        });
      }
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`,
      });
    }

    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || "File upload failed",
      });
    }

    next();
  });
};
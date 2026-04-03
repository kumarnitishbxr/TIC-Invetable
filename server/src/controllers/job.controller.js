




export const createJob = async (req, res, next) => {
   try {
      const {
         title,
         description,
         category = 'General',
         employmentType = 'Full-time',
         locationText,
         salaryMin,
         salaryMax,
         payFrequency = 'Daily',
         skills = [],
         experienceLevel = 'Entry Level',
         coordinates
      } = req.body;

      const trimmedTitle = title?.trim();
      const trimmedDescription = description?.trim();
      const trimmedLocation = locationText?.trim();
      const parsedSkills = Array.isArray(skills) ? skills.filter(Boolean) : [];
      const parsedSalaryMin = salaryMin !== undefined && salaryMin !== null && salaryMin !== '' ? Number(salaryMin) : undefined;
      const parsedSalaryMax = salaryMax !== undefined && salaryMax !== null && salaryMax !== '' ? Number(salaryMax) : undefined;

      if (!trimmedTitle || !trimmedDescription || !trimmedLocation) {
         return res.status(400).json({
            success: false,
            message: "Title, description and location are required"
         });
      }

      if (parsedSkills.length === 0) {
         return res.status(400).json({
            success: false,
            message: "Please provide at least one skill"
         });
      }

      if (
         parsedSalaryMin !== undefined &&
         parsedSalaryMax !== undefined &&
         parsedSalaryMin > parsedSalaryMax
      ) {
         return res.status(400).json({
            success: false,
            message: "Maximum salary must be greater than minimum salary"
         });
      }

      const job = new Job({
         title: trimmedTitle,
         description: trimmedDescription,
         category,
         employmentType,
         salaryMin: parsedSalaryMin,
         salaryMax: parsedSalaryMax,
         payFrequency,
         wage: parsedSalaryMax ?? parsedSalaryMin,
         skills: parsedSkills,
         experienceLevel,
         locationText: trimmedLocation,
         employer: req.user?._id
      });

      if (coordinates?.lat !== undefined && coordinates?.lng !== undefined) {
         const lat = Number(coordinates.lat);
         const lng = Number(coordinates.lng);
         if (Number.isFinite(lat) && Number.isFinite(lng)) {
            job.location = {
               type: 'Point',
               coordinates: [lng, lat]
            };
         }
      }

      await job.save();
      return res.status(201).json({
         success: true,
         message: "Job Created",
         data: job
      });
   } catch (err) {
      return res.status(500).json({
         success: false,
         message: err.message
      });
   }
}
import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectToDB } from "./src/config/db.config.js";
import redisClient from "./src/config/redis.config.js";
import { processPendingJobsLifecycle } from "./src/utils/job.utils.js";

const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  try {
    // ✅ DB + Redis connect
    await Promise.all([
      connectToDB(),
      redisClient.connect()
    ]);

    console.log("✅ DB & Redis connected");

    // ✅ Initial job processing
    await processPendingJobsLifecycle();

    // ✅ Background job every 60 sec
    setInterval(async () => {
      try {
        await processPendingJobsLifecycle();
      } catch (error) {
        console.error("❌ Lifecycle maintenance error:", error.message);
      }
    }, 60_000);

    // ✅ Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server bootstrap failed:", error.message);
    process.exit(1); // important for production
  }
};

bootstrap();
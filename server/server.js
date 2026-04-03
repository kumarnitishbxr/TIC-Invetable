import { configDotenv } from "dotenv";
configDotenv();
import app from "./src/app.js";
import { connectToDB } from "./src/config/db.config.js";
import redisClient from "./src/config/redis.config.js";

const PORT = process.env.PORT || 3000;

const bootstrap = async () => {

    try {
        await Promise.all([connectToDB(), redisClient.connect()]);
    
        app.listen(PORT, () => {
            console.log(`app listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

bootstrap();


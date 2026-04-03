import { configDotenv } from "dotenv";
configDotenv();

import app from "./src/app.js";
import { connectToDB } from "./src/config/db.config.js";

const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
    await connectToDB();
    app.listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    })
}

bootstrap();


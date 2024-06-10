import dotenv from "dotenv";
import { dbConnect } from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on PORT :: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to run server :: ", err);
  });

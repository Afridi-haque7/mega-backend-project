import express from 'express'
import healthCheckRouter from "./routes/healthcheck.routes.js";



const app = express();

//router import
app.use("/api/v1/healthcheck", healthCheckRouter)


export default app;
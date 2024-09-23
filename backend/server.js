import express from 'express';
import authRoutes from './routes/auth.route.js';
import { ENV_VARS } from './config/envVars.js';


const app = express();



app.use('/api/v1/auth', authRoutes)
console.log(`MONGO_URI: ${ENV_VARS.MONGO_URI}`);

const port = ENV_VARS.PORT
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});


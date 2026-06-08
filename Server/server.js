import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { apiRouter } from './Routes/apiRoutes.js'
import { checkEnvironment } from './Utils/checkEnvironment.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

checkEnvironment();

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
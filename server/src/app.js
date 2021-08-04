import express from 'express'
import config from './config'
import employeesRoutes from './routes/employees.routes'


const app = express();

//settings
app.set('port', config.port);

//middlewares

let cors = require("cors");
app.use(cors());

app.use(express.json())

app.use(express.urlencoded({extended: false}));

app.use(employeesRoutes);



export default app;
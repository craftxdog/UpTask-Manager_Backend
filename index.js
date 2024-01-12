import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors"
import dbConnection from "./config/dbConnection.js";
import userRoutes from "./routes/userRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

const application = express();
application.use(express.json());

configDotenv();

dbConnection();

const whitelist = [process.env.FRONTEND_URL,'http://192.168.16.103:5173'];

const corsOptions = {
    origin:function(origin, callback){
        if(whitelist.includes(origin)){
            //Puede consultar la API
            callback(null, true)
        }else{
            //No permitido
            callback(new Error('Error de Cors'))
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
};

application.use(cors(corsOptions));

application.use("/api/users", userRoutes)
application.use("/api/projects", projectRoutes);
application.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;

application.listen(PORT, () => {
  console.log(`Server is connected in ${PORT} PORT`);
})

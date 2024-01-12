import express from "express"
import { newTask, findTask, updateTask, deleteTask, changeStatus } from "../controllers/taskController.js"
import checkAuthentication from "../middleware/checkAuthentication.js"

const routes = express.Router();

routes.post("/", checkAuthentication, newTask);
routes.route("/:id").get(checkAuthentication, findTask).put(checkAuthentication, updateTask).delete(checkAuthentication, deleteTask);
routes.post("/status/:id", checkAuthentication, changeStatus);

export default routes;


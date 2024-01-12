import express  from "express";
import { projecList, newProjet, findProject, editProject, deleteProject, addProjectCollaborator, deleteProjectCollaborator } from "../controllers/projectController.js";
import checkAuthentication from "../middleware/checkAuthentication.js";

const routes = express.Router();

routes.route("/").get(checkAuthentication, projecList).post(checkAuthentication, newProjet);
routes.route("/:id").get(checkAuthentication, findProject).put(checkAuthentication, editProject).post(checkAuthentication, deleteProject);
routes.post("/add-collaborator/:id", checkAuthentication, addProjectCollaborator);
routes.post("/delete-collaborator/:id", checkAuthentication, deleteProjectCollaborator);

export default routes;

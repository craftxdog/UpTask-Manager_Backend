import Projects from "../models/Projects.js"
import Tasks from "../models/Tasks.js"

const newProjet = async (req, res) => {
  const project = new Projects(req.body);
  try {
    project.creator = req.user._id;
    await project.save();
  } catch (error) {
    console.log(error.message)
  }
}

const projecList = async (req, res) => {
  try {
    const projects = await Projects.find().where("creator").equals(req.user);
    res.json(projects);
  } catch (error) {
    console.log(error);
  }
}

const findProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Projects.findById(id);

    if (!project) {
      const error = new Error ("Project not found");
      return res.status(404).json({ msg: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
      const error = new Error ("Invalid Action");
      return res.status(401).json({ msg: error.message });
    }
    const tasks = await Tasks.find().where("project").equals(project._id);
    res.json({
      project,
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
}

const editProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.findById(id);

    if (!project){
      const error = new Error("Project not Found");
      return res.status(404).json({ msg: error.message });
    }
    if (project.creator.toString() !== req.user._id.toString()){
      const error = new Error("Invalid Action");
      return res.status(401).json({ msg: error.message })
    }
    project.projectName = req.body.projectName || project.projectName;
    project.description = req.body.description || project.description;
    project.finallyDate = req.body.finallyDate || project.finallyDate;
    project.client = req.body.client || project.client;

    const updateProject = await project.save();
    res.json(updateProject);
  } catch (error) {
    console.log(error);
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.findById(id);
    if (!project) {
      const error = new Error("Project not Found");
      return res.status(404).json({ msg: error.message });
    }
    if (project.creator.toString() !== req.user._id.toString()){
      const error = new Error("Invalid Action");
      return res.status(401).json({ msg: error.message })
    }

    await project.deleteOne();
    res.json({ msg: "The project was deleted" });
  } catch (error) {
    console.log(error);
  }
}

const addProjectCollaborator = async (req, res) => {
  const { user } = req;
  res.json(user);
}

const deleteProjectCollaborator = async (req, res) => {
  const { user } = req;
  res.json(user);
}

export { newProjet, projecList, findProject, editProject, deleteProject, addProjectCollaborator, deleteProjectCollaborator }

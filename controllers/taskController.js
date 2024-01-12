import Projects from "../models/Projects.js"
import Task from "../models/Tasks.js"

const newTask = async (req, res) => {
  const { project } = req.body;
  try {
    const projectExist = await Projects.findById(project);

    if (!projectExist){
      const error = new Error("The project does not Exist");
      return res.status(404).json({ msg: error.message });
    }
    if (projectExist.creator.toString() !== req.user._id.toString()){
      const error = new Error("You don't have the necessary permissions");
      return res.status(403).json({ msg: error.message });
    }
    const newTask = await Task.create(req.body);
    res.json(newTask);
  } catch (error) {
    console.log(error);
  }

}

const findTask = async (req, res) => {
  const { id } = req.params;

  try {
    const existTask = await Task.findById(id).populate("project");

    if (!existTask) {
      const error = new Error("Task not Found");
      return res.status(404).json({ smg: error.message });
    }
    if (existTask.project.creator.toString() !== req.user._id.toString()) {
      const error = new Error("Invalid Error");
      return res.status(403).json({ smg: error.message });
    }
    res.json(existTask);
  } catch (error) {
    console.log(error);
  }
}

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const existTask = await Task.findById(id).populate("project");
    if(!existTask){
      const error = new Error("Task not Found");
      return res.status(404).json({ msg: error.message });
    }
    if (existTask.project.creator.toString() !== req.user._id.toString()){
      const error = new Error("Invalid Action");
      return res.status(403).json({ smg: error.message });
    }
    existTask.taskName = req.body.taskName || existTask.taskName;
    existTask.description = req.body.description || existTask.description;
    existTask.priority = req.body.priority || existTask.priority;
    existTask.finallyDate = req.body.finallyDate || existTask.finallyDate;

    const updateTask = await existTask.save();
    res.json(updateTask);
  } catch (error) {
    console.log(error);
  }
}

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const existTask = await Task.findById(id).populate("project");

    if (!existTask){
      const error = new Error("Task not Found");
      return res.status(404).json({ msg: error.message })
    }
    if (existTask.project.creator.toString() !== req.user._id.toString()){
      const error = new Error("Invalid Action");
      return res.status(403).json({ msg: error.message });
    }
    await existTask.deleteOne();
    res.json({ msg: "Task Deleted" })
  } catch (error) {
    console.log(error);
  }
}

const changeStatus = async (req, res) => {
  console.log("Status Task");
}

export { newTask, findTask, deleteTask, updateTask, changeStatus }

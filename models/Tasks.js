import mongoose from "mongoose";

const taskSchema = mongoose.Schema ({
  taskName: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  finallyDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  priority: {
    type: String,
    required: true,
    enum: ["Low", "Media", "High"],
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projects",
  },
},
  {
    timestamps: true,
  }
);
const Task = mongoose.model("Task", taskSchema);
export default Task;



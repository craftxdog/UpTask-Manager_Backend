import { mongoose } from "mongoose";

const projectSchema = mongoose.Schema ({
  projectName: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  finallyDate: {
    type: Date,
    default: Date.now(),
  },
  client: {
    type: String,
    trim: true,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},
  {
    timestamps: true,
  },
);

const Projects = mongoose.model("Projects", projectSchema);
export default Projects;


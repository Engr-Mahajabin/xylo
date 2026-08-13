import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" }, // imageUrl এর বদলে image দেওয়া হয়েছে এবং required তুলে দেওয়া হয়েছে
    badge: { type: String, default: "" }, // category এর বদলে badge দেওয়া হয়েছে
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
  },
  { timestamps: true },
);

export default models.Project || model("Project", ProjectSchema);

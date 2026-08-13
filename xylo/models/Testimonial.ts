import mongoose, { Schema, model, models } from "mongoose";

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    comment: { type: String, required: true },
    rating: { type: Number, default: 5 },
  },
  { timestamps: true },
);

export default models.Testimonial || model("Testimonial", TestimonialSchema);

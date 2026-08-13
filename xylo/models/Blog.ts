import mongoose, { Schema, models, model } from "mongoose";

export interface IBlog {
  title: string;
  slug: string;
  author?: string;
  category?: string;
  tags?: string;
  readingTime?: string;
  publishedAt?: Date;
  coverImage?: string;
  excerpt?: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: [true, "Title is required"] },
    slug: { type: String, required: [true, "Slug is required"], unique: true },
    author: { type: String, default: "Admin" },
    category: { type: String, default: "General" },
    tags: { type: String, default: "" },
    readingTime: { type: String, default: "5 min read" },
    publishedAt: { type: Date, default: Date.now },
    coverImage: { type: String, default: "" },
    excerpt: { type: String, default: "" },
    content: { type: String, required: [true, "Content is required"] },
  },
  { timestamps: true },
);

const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);

export default Blog;

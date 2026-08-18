import api from "@/lib/axios";
import { BlogPost } from "./blog.types";

export const blogService = {
  // ১. সব ব্লগ সার্ভিস
  getAllBlogs: async (): Promise<BlogPost[]> => {
    const response = await api.get<BlogPost[]>("/api/blogs/");
    return response.data;
  },

  // ২. সিঙ্গেল ব্লগ সার্ভিস (id বা slug দিয়ে)
  getBlogBySlug: async (slug: string): Promise<BlogPost> => {
    const response = await api.get<BlogPost>(`/api/blogs/${slug}/`);
    return response.data;
  },
};
import api from "@/lib/axios";

// ১. সব ব্লগ ফেচ করার জন্য (GET /blogs/)
export const getBlogs = async () => {
  const response = await api.get("/blogs/");
  return response.data;
};

// ২. পপুলার ব্লগ ফেচ করার জন্য (GET /blogs/popular/)
export const getPopularBlogs = async () => {
  const response = await api.get("/blogs/popular/");
  return response.data;
};

// ৩. সিঙ্গেল ব্লগ ডিটেইলস দেখার জন্য (GET /blogs/{slug}/)
export const getBlogBySlug = async (slug) => {
  const response = await api.get(`/blogs/${slug}/`);
  return response.data;
};

// ৪. রিয়েকশন দেওয়ার জন্য (POST /blogs/{slug}/react/)
export const reactToBlog = async (slug, reactionData) => {
  const response = await api.post(`/blogs/${slug}/react/`, reactionData);
  return response.data;
};

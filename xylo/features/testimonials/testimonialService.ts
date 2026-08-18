import api from "@/lib/axios";
import { BackendTestimonial, TestimonialItem } from "./testimonial.types";

export const testimonialService = {
  getTestimonials: async (): Promise<TestimonialItem[]> => {
    const response = await api.get("/api/testimonials/");
    
    // Django Pagination হ্যান্ডলিং (results থাকলে তা নিবে, না থাকলে রেসপন্স ডাটা)
    const rawData: BackendTestimonial[] = Array.isArray(response.data)
      ? response.data
      : response.data?.results || [];

    return rawData.map((item) => {
      let userRole = item.role || "";
      if (item.position || item.company) {
        userRole =
          item.position && item.company
            ? `${item.position} @ ${item.company}`
            : item.position || item.company || "";
      }

      return {
        id: item.id,
        name: item.name || "Anonymous",
        role: userRole || "Client",
        text: item.content || item.text || "",
      };
    });
  },
};
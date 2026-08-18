export interface BackendTestimonial {
  id?: number | string;
  name: string;
  content?: string;
  text?: string;
  position?: string;
  company?: string;
  role?: string;
}

export interface TestimonialItem {
  id?: number | string;
  name: string;
  role: string;
  text: string;
}

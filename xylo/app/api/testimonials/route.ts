import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/models/Testimonial";

// Get All Testimonials
export async function GET() {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, data: testimonials },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// Create New Testimonial
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    console.log("--> Incoming Payload from Frontend:", body);

    // Schema validation অনুযায়ী exact mapping
    const testimonialData = {
      name: body.name,
      role: body.role || "Client", // Required field fallback
      content: body.comment || body.content || "No comment provided", // Required field mapping
      avatarUrl: body.avatarUrl || "",
      rating: Number(body.rating) || 5,
    };

    const newTestimonial = await Testimonial.create(testimonialData);
    console.log("--> Successfully Saved to DB:", newTestimonial);

    return NextResponse.json(
      { success: true, data: newTestimonial },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("--> Mongoose Save Error Details:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save testimonial" },
      { status: 400 },
    );
  }
}

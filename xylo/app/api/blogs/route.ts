import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

// Title থেকে URL-friendly Slug বানানোর Helper Function
function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Special character মুছে ফেলবে
    .replace(/[\s_-]+/g, "-") // Space কে Dash (-) এ রূপান্তর করবে
    .replace(/^-+|-+$/g, ""); // শুরুর বা শেষের Dash তুলে ফেলবে
}

// Get All Blogs
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// Create New Blog
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 },
      );
    }

    // Title থেকে Slug তৈরি করা হচ্ছে
    const generatedSlug = createSlug(body.title) || `blog-${Date.now()}`;

    // Body এর সাথে Slug যুক্ত করে ডাটাবেজে পাঠানো হচ্ছে
    const blogData = {
      ...body,
      slug: generatedSlug,
    };

    const blog = await Blog.create(blogData);
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

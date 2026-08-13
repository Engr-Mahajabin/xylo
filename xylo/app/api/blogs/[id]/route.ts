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

// Update Blog
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params; // Next.js 15+ এ params await করতে হয়
    const body = await req.json();

    const updateData = { ...body };

    // টাইটেল আপডেট হলে স্লগ-ও আপডেট করা হচ্ছে
    if (body.title) {
      updateData.slug = createSlug(body.title) || `blog-${Date.now()}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, data: updatedBlog },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

// Delete Blog
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params; // Next.js 15+ এ params await করতে হয়

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Blog deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

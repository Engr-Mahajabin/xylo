import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";

// Get All Projects
export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });

    // ফ্রন্টএন্ড সরাসরি অ্যারে আশা করলে অ্যারে রিটার্ন করা ভালো
    return NextResponse.json(projects, { status: 200 });
  } catch (error: any) {
    console.error("GET Projects Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// Create New Project
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Body থেকে ডেটা ডিসট্রাকচার করে ফিল্ড ম্যাপিং নিশ্চিত করা
    const {
      title,
      description,
      badge,
      category,
      image,
      imageUrl,
      liveUrl,
      githubUrl,
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: "Title and description are required" },
        { status: 400 },
      );
    }

    const projectData = {
      title,
      description,
      badge: badge || category || "",
      image: image || imageUrl || "",
      liveUrl: liveUrl || "",
      githubUrl: githubUrl || "",
    };

    const project = await Project.create(projectData);

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error: any) {
    console.error("POST Project Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";

// Update Project
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }, // Next.js 15+ Async Params Support
) {
  try {
    await dbConnect();
    const { id } = await params; // await করে id বের করে নেওয়া
    const body = await req.json();

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

    // Field mapping নিশ্চিত করা
    const updateData = {
      title,
      description,
      badge: badge || category || "",
      image: image || imageUrl || "",
      liveUrl: liveUrl || "",
      githubUrl: githubUrl || "",
    };

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, data: updatedProject },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("PUT Project Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

// Delete Project
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }, // Next.js 15+ Async Params Support
) {
  try {
    await dbConnect();
    const { id } = await params; // await করে id বের করে নেওয়া

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Project deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("DELETE Project Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

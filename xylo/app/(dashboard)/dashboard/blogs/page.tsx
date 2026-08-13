"use client";

import { useEffect, useState } from "react";

interface Blog {
  _id: string;
  title: string;
  author?: string;
  category?: string;
  tags?: string;
  readingTime?: string;
  publishedAt?: string;
  coverImage?: string;
  excerpt?: string;
  content: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    tags: "",
    readingTime: "5 min read",
    publishedAt: new Date().toISOString().split("T")[0], // Default today's date
    coverImage: "",
    excerpt: "",
    content: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch Blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const result = await res.json();

      if (res.ok && Array.isArray(result)) {
        setBlogs(result);
      } else if (res.ok && Array.isArray(result?.data)) {
        setBlogs(result.data);
      } else if (res.ok && Array.isArray(result?.blogs)) {
        setBlogs(result.blogs);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Image Upload to ImgBB
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=6d207e02198a847aa98d0a2a901485a5`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();

      if (data.success) {
        setForm((prev) => ({ ...prev, coverImage: data.data.display_url }));
      } else {
        alert("Image upload failed.");
      }
    } catch (err) {
      console.error("Image Upload Error:", err);
    } finally {
      setUploadingImage(false);
    }
  };

  // Helper for Content formatting (Heading, Bold, Code)
  const insertFormatting = (syntax: string) => {
    setForm((prev) => ({
      ...prev,
      content: prev.content + syntax,
    }));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const isEditing = Boolean(editingId);
      const url = isEditing ? `/api/blogs/${editingId}` : "/api/blogs";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok && (result.success || result._id || res.status === 200)) {
        resetForm();
        await fetchBlogs();
      } else {
        alert(result.error || "Failed to save blog");
      }
    } catch (err) {
      console.error("Submit Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      author: "",
      category: "",
      tags: "",
      readingTime: "5 min read",
      publishedAt: new Date().toISOString().split("T")[0],
      coverImage: "",
      excerpt: "",
      content: "",
    });
    setEditingId(null);
  };

  const handleEdit = (item: Blog) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      author: item.author || "",
      category: item.category || "",
      tags: item.tags || "",
      readingTime: item.readingTime || "5 min read",
      publishedAt: item.publishedAt
        ? new Date(item.publishedAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      coverImage: item.coverImage || "",
      excerpt: item.excerpt || "",
      content: item.content || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) fetchBlogs();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-extrabold uppercase tracking-wider font-[family-name:var(--font-black-ops)] text-white">
          Blogs <span className="text-yellow-500">Management</span>
        </h1>
      </div>

      {/* FORM SECTION */}
      <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider">
          {editingId ? "Edit" : "Add New"}{" "}
          <span className="text-yellow-500">Blog</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Title (Full Width so it has enough space) */}
          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-medium">
              Blog Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. How to Build Scalable Web Apps with Next.js"
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 text-sm"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          {/* Row 2: Author, Category, Tags */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium">
                Author
              </label>
              <input
                type="text"
                placeholder="Author Name"
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 text-sm"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium">
                Category
              </label>
              <input
                type="text"
                placeholder="e.g. Web Development"
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 text-sm"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium">
                Tags (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="e.g. React, Nextjs, Tailwind"
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 text-sm"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
            </div>
          </div>

          {/* Row 3: Publish Date & Read Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium">
                Publish Date (Date / Time / Year)
              </label>
              <input
                type="date"
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 text-sm"
                value={form.publishedAt}
                onChange={(e) =>
                  setForm({ ...form, publishedAt: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium">
                Estimated Reading Time
              </label>
              <input
                type="text"
                placeholder="e.g. 5 min read"
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 text-sm"
                value={form.readingTime}
                onChange={(e) =>
                  setForm({ ...form, readingTime: e.target.value })
                }
              />
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-medium">
              Cover Image (Upload from PC)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-yellow-500/10 file:text-yellow-500 hover:file:bg-yellow-500 hover:file:text-black text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-xl w-full cursor-pointer transition"
              />
              {uploadingImage && (
                <span className="text-xs text-yellow-500 animate-pulse whitespace-nowrap">
                  Uploading...
                </span>
              )}
            </div>
            {form.coverImage && (
              <div className="mt-2 flex items-center gap-3">
                <img
                  src={form.coverImage}
                  alt="Preview"
                  className="w-16 h-12 object-cover rounded-lg border border-zinc-700"
                />
                <span className="text-xs text-emerald-400">
                  ✓ Image uploaded!
                </span>
              </div>
            )}
          </div>

          {/* Excerpt Summary */}
          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-medium">
              Short Excerpt / Summary
            </label>
            <input
              type="text"
              placeholder="Short preview text for blog cards..."
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 text-sm"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            />
          </div>

          {/* Content with Formatting Toolbar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-zinc-400 font-medium">
                Blog Main Content *
              </label>
              {/* Toolbar to insert formatting */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => insertFormatting("\n# Main Heading\n")}
                  className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-xs"
                >
                  H1 (Big Font)
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("\n## Sub Heading\n")}
                  className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-xs"
                >
                  H2 (Medium)
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("**Bold Text**")}
                  className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-xs font-bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() =>
                    insertFormatting("\n```javascript\n// Code here\n```\n")
                  }
                  className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-xs"
                >
                  Code Block
                </button>
              </div>
            </div>

            <textarea
              required
              rows={9}
              placeholder="Write your article here... (Supports Markdown syntax for headings and font sizes)"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 text-sm leading-relaxed"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>

          {/* Submit Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-xl uppercase tracking-wider text-xs transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={submitting || uploadingImage}
              className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl uppercase tracking-wider text-xs transition disabled:opacity-50"
            >
              {submitting
                ? "Publishing..."
                : editingId
                  ? "Update Blog"
                  : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>

      {/* BLOGS TABLE */}
      <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-4">
          All <span className="text-yellow-500">Blogs</span>
        </h2>
        {loading ? (
          <p className="text-zinc-500 text-sm">Loading...</p>
        ) : !Array.isArray(blogs) || blogs.length === 0 ? (
          <p className="text-zinc-500 text-sm">No blogs found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-400">
              <thead className="bg-zinc-900 text-zinc-300 uppercase text-xs">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Cover</th>
                  <th className="p-3.5">Title</th>
                  <th className="p-3.5">Author</th>
                  <th className="p-3.5">Category & Tags</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {Array.isArray(blogs) &&
                  blogs.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-zinc-900/50 transition"
                    >
                      <td className="p-3.5">
                        {item.coverImage ? (
                          <img
                            src={item.coverImage}
                            alt=""
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-xs text-zinc-600">No img</span>
                        )}
                      </td>
                      <td className="p-3.5 font-medium text-white max-w-xs truncate">
                        {item.title}
                      </td>
                      <td className="p-3.5 text-zinc-400 whitespace-nowrap">
                        {item.author || "N/A"}
                      </td>
                      <td className="p-3.5">
                        <div className="text-yellow-500 font-medium">
                          {item.category || "General"}
                        </div>
                        {item.tags && (
                          <div className="text-xs text-zinc-500 truncate max-w-[150px]">
                            {item.tags}
                          </div>
                        )}
                      </td>
                      <td className="p-3.5 text-xs text-zinc-500 whitespace-nowrap">
                        {item.publishedAt
                          ? new Date(item.publishedAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="p-3.5 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-lg text-xs transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg text-xs transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

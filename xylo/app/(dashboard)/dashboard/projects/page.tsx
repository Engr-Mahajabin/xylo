"use client";

import { useEffect, useState } from "react";

interface Project {
  _id: string;
  title: string;
  description: string;
  badge?: string;
  image?: string;
  liveUrl?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    badge: "",
    image: "",
    liveUrl: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();

      // API response structure-এর উপর নির্ভর করে ডাটা সেট করা
      if (res.ok) {
        if (Array.isArray(data)) {
          setProjects(data);
        } else if (Array.isArray(data.data)) {
          setProjects(data.data);
        } else if (Array.isArray(data.projects)) {
          setProjects(data.projects);
        } else {
          setProjects([]);
        }
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // PC থেকে ফাইল আপলোড করার ফাংশন
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "projects"); // XYLO/projects ফোল্ডারে সেভ হবে

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      // Safe JSON parsing to prevent Unexpected Token errors
      const textResponse = await res.text();
      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (e) {
        console.error("Server non-JSON response:", textResponse);
        alert("Server returned invalid response. Please try again.");
        return;
      }

      if (res.ok && data.url) {
        setForm((prev) => ({ ...prev, image: data.url }));
      } else {
        alert(`Image upload failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong during image upload!");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const isEditing = Boolean(editingId);
      const url = isEditing ? `/api/projects/${editingId}` : "/api/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({
          title: "",
          description: "",
          badge: "",
          image: "",
          liveUrl: "",
        });
        setEditingId(null);
        fetchProjects();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Failed to save: ${errorData.error || res.statusText}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: Project) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      badge: item.badge || "",
      image: item.image || "",
      liveUrl: item.liveUrl || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold uppercase tracking-wider font-[family-name:var(--font-black-ops)] text-white">
          Projects <span className="text-yellow-500">Management</span>
        </h1>
      </div>

      <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">
            {editingId ? "Edit" : "Add New"}{" "}
            <span className="text-yellow-500">Project</span>
          </h2>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm({
                  title: "",
                  description: "",
                  badge: "",
                  image: "",
                  liveUrl: "",
                });
              }}
              className="text-xs text-zinc-400 hover:text-white underline"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            required
            placeholder="Project Title"
            className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 text-sm"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            type="text"
            placeholder="Badge / Category"
            className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 text-sm"
            value={form.badge}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
          />

          <input
            type="url"
            placeholder="Live Project URL (optional)"
            className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 text-sm"
            value={form.liveUrl}
            onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
          />

          {/* New Custom Image Upload Input with Preview */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                className="hidden"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="fileInput"
                className="px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded-lg text-xs font-semibold cursor-pointer transition shrink-0 uppercase tracking-wider"
              >
                {uploadingImage ? "Uploading..." : "Choose File"}
              </label>

              <div className="flex-1 flex items-center justify-between pr-2 overflow-hidden">
                {form.image ? (
                  <div className="flex items-center justify-between w-full gap-2">
                    <span className="text-xs text-green-400 font-medium truncate">
                      ✓ Uploaded
                    </span>
                    <img
                      src={form.image}
                      alt="Thumbnail Preview"
                      className="w-8 h-8 object-cover rounded-md border border-yellow-500/40"
                    />
                  </div>
                ) : (
                  <span className="text-xs text-zinc-500">
                    {uploadingImage
                      ? "Uploading to Cloudinary..."
                      : "No file chosen"}
                  </span>
                )}
              </div>
            </div>
          </div>

          <textarea
            required
            placeholder="Project Description"
            rows={3}
            className="md:col-span-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 text-sm resize-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="md:col-span-2 flex justify-end pt-2">
            <button
              type="submit"
              disabled={submitting || uploadingImage}
              className="px-8 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl uppercase tracking-wider text-xs transition disabled:opacity-50"
            >
              {submitting
                ? "Saving..."
                : editingId
                  ? "Update Project"
                  : "Add Project"}
            </button>
          </div>
        </form>
      </div>

      {/* Projects Table */}
      <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-4">
          All <span className="text-yellow-500">Projects</span>
        </h2>
        {loading ? (
          <p className="text-zinc-500 text-sm">Loading...</p>
        ) : !Array.isArray(projects) || projects.length === 0 ? (
          <p className="text-zinc-500 text-sm">No projects found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-400">
              <thead className="bg-zinc-900 text-zinc-300 uppercase text-xs">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Image</th>
                  <th className="p-3.5">Title</th>
                  <th className="p-3.5">Badge</th>
                  <th className="p-3.5">Description</th>
                  <th className="p-3.5">Live Link</th>
                  <th className="p-3.5 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {projects.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-zinc-900/50 transition"
                  >
                    <td className="p-3.5">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 object-cover rounded-lg border border-zinc-800"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-[10px] text-zinc-500">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="p-3.5 font-medium text-white">
                      {item.title}
                    </td>
                    <td className="p-3.5 text-zinc-400">
                      {item.badge || "N/A"}
                    </td>
                    <td className="p-3.5 text-zinc-400 truncate max-w-xs">
                      {item.description}
                    </td>
                    <td className="p-3.5">
                      {item.liveUrl ? (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-yellow-500 hover:underline"
                        >
                          View Site
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500 hover:text-black rounded-lg text-xs transition"
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

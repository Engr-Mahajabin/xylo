"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  content?: string;
  comment?: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", role: "", comment: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // 1. Fetch Testimonials
  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const result = await res.json();

      // API Response: { success: true, data: [...] }
      if (res.ok && result.success && Array.isArray(result.data)) {
        setTestimonials(result.data);
      } else if (res.ok && Array.isArray(result)) {
        setTestimonials(result);
      } else {
        setTestimonials([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // 2. Add OR Update Testimonial
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const isEditing = Boolean(editingId);
      const url = isEditing
        ? `/api/testimonials/${editingId}`
        : "/api/testimonials";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok && (result.success || result._id)) {
        setForm({ name: "", role: "", comment: "" });
        setEditingId(null); // Clear Edit state
        await fetchTestimonials(); // Refresh list
      } else {
        alert(result.error || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // 3. Start Editing (Populate form)
  const handleEdit = (item: Testimonial) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      role: item.role || "",
      comment: item.content || item.comment || "", // content or comment fallback
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 4. Cancel Editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", role: "", comment: "" });
  };

  // 5. Delete Testimonial
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      const result = await res.json();

      if (res.ok && (result.success || res.status === 200)) {
        await fetchTestimonials();
      } else {
        alert(result.error || "Failed to delete!");
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-3xl font-extrabold uppercase tracking-wider font-[family-name:var(--font-black-ops)] text-white">
          Testimonials <span className="text-yellow-500">Management</span>
        </h1>
      </div>

      {/* Dynamic Form (Add & Edit Both) */}
      <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider">
          {editingId ? "Edit" : "Add New"}{" "}
          <span className="text-yellow-500">Review</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Client Name"
              className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 text-sm"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Role / Company (e.g. CEO @ Tech)"
              className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 text-sm"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>

          <textarea
            required
            rows={3}
            placeholder="Client Comment / Review..."
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 text-sm resize-none"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
          />

          <div className="flex justify-end gap-3">
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-xl uppercase tracking-wider text-xs transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl uppercase tracking-wider text-xs transition disabled:opacity-50"
            >
              {submitting
                ? "Saving..."
                : editingId
                  ? "Update Testimonial"
                  : "Add Testimonial"}
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-4">
          All <span className="text-yellow-500">Reviews</span>
        </h2>
        {loading ? (
          <p className="text-zinc-500 text-sm">Loading...</p>
        ) : !Array.isArray(testimonials) || testimonials.length === 0 ? (
          <p className="text-zinc-500 text-sm">No testimonials found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-400">
              <thead className="bg-zinc-900 text-zinc-300 uppercase text-xs">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Name</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Comment</th>
                  <th className="p-3.5 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {testimonials?.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-zinc-900/50 transition"
                  >
                    <td className="p-3.5 font-medium text-white">
                      {item.name}
                    </td>
                    <td className="p-3.5 text-zinc-400">
                      {item.role || "N/A"}
                    </td>
                    <td className="p-3.5 text-zinc-400 max-w-sm truncate">
                      {item.content || item.comment || "N/A"}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
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

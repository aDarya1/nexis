import { X, Upload, Plus } from "lucide-react";
import { useState } from "react";

type PublishModalProps = {
  onClose: () => void;
  onSubmit: (data: any) => void;
};

export function PublishModal({ onClose, onSubmit }: PublishModalProps) {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [abstract, setAbstract] = useState("");
  const [tags, setTags] = useState("");
  const [community, setCommunity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onSubmit({
      title,
      authors,
      abstract,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      community,
    });

    setIsSubmitting(false);
  };

  const isValid = title && authors && abstract && tags;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1e1e2e] border-2 border-[#00eeff]/30 rounded-lg shadow-[0_0_50px_rgba(0,238,255,0.3)] w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">Publish Research</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#121212] rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your research title"
              className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-lg focus:outline-none focus:border-[#00eeff] focus:shadow-[0_0_15px_rgba(0,238,255,0.2)] transition-all text-white placeholder-gray-500"
              required
            />
          </div>

          {/* Authors */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Authors *
            </label>
            <input
              type="text"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              placeholder="Add co-authors (comma separated)"
              className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-lg focus:outline-none focus:border-[#00eeff] focus:shadow-[0_0_15px_rgba(0,238,255,0.2)] transition-all text-white placeholder-gray-500"
              required
            />
          </div>

          {/* Abstract */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Abstract *
            </label>
            <textarea
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Write a brief summary of your research"
              rows={6}
              className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-lg focus:outline-none focus:border-[#00eeff] focus:shadow-[0_0_15px_rgba(0,238,255,0.2)] transition-all text-white placeholder-gray-500 resize-none"
              required
            />
          </div>

          {/* Upload PDF */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upload PDF
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="flex items-center gap-3 px-4 py-3 bg-[#121212] border border-gray-700 rounded-lg hover:border-[#00eeff] cursor-pointer transition-all group"
              >
                <Upload className="w-5 h-5 text-gray-400 group-hover:text-[#00eeff] transition-colors" />
                <span className="text-gray-400 group-hover:text-white transition-colors">
                  {fileName || "Choose file"}
                </span>
              </label>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tags *
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Add relevant tags (comma separated, e.g., #AI, #Quantum)"
              className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-lg focus:outline-none focus:border-[#00eeff] focus:shadow-[0_0_15px_rgba(0,238,255,0.2)] transition-all text-white placeholder-gray-500"
              required
            />
          </div>

          {/* Community Select */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Community
            </label>
            <select
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-lg focus:outline-none focus:border-[#00eeff] focus:shadow-[0_0_15px_rgba(0,238,255,0.2)] transition-all text-white"
            >
              <option value="">Select a community</option>
              <option value="quantum">Quantum Physics</option>
              <option value="ml">Machine Learning</option>
              <option value="bio">Biotechnology</option>
              <option value="neuro">Neuroscience</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-400 hover:text-white hover:bg-[#121212] rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`flex items-center gap-2 px-8 py-3 font-semibold rounded-lg transition-all duration-200 ${
                isValid && !isSubmitting
                  ? "bg-gradient-to-r from-[#00eeff] to-[#5d8aa8] text-[#121212] hover:shadow-[0_0_25px_rgba(0,238,255,0.5)] active:scale-95"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#121212] border-t-transparent rounded-full animate-spin" />
                  <span>SUBMITTING...</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>SUBMIT PREPRINT</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

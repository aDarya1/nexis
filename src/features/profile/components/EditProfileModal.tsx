import { X, Save, Upload, Loader2, AlertCircle } from "lucide-react";
import { useState, type FormEvent, type ChangeEvent } from "react";

/**
 * Interfejs danych profilu użytkownika
 */
export type UserProfileData = {
  name: string;
  bio: string;
  field: string;
  location: string;
  website: string;
  avatar: string;
};

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UserProfileData) => Promise<void>;
  initialData?: Partial<UserProfileData>;
};

/**
 * Modal do edycji profilu użytkownika
 * TODO: Zastąp localStorage prawdziwym API backendu
 * Przykład:
 * - onSave: await fetch(`/api/users/${userId}/profile`, {
 *     method: 'PUT',
 *     body: JSON.stringify(data),
 *     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
 *   })
 */
export function EditProfileModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<UserProfileData>({
    name: initialData?.name || "Dr. You",
    bio: initialData?.bio || "Quantum Computing Researcher",
    field: initialData?.field || "Quantum Computing",
    location: initialData?.location || "Stanford, CA",
    website: initialData?.website || "research.stanford.edu/~you",
    avatar:
      initialData?.avatar ||
      "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserProfileData, string>>
  >({});
  const [avatarPreview, setAvatarPreview] = useState(formData.avatar);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserProfileData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Imię i nazwisko jest wymagane";
    }

    if (formData.bio.length > 500) {
      newErrors.bio = "Bio nie może przekraczać 500 znaków";
    }

    if (
      formData.website &&
      !isValidUrl(formData.website) &&
      !formData.website.startsWith("http")
    ) {
      newErrors.website =
        "Nieprawidłowy adres URL (użyj formatu https://example.com)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return false;
      }
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Błąd podczas zapisywania profilu:", error);
      setErrors({
        name:
          error instanceof Error
            ? error.message
            : "Nie udało się zapisać profilu. Spróbuj ponownie.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof UserProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Wyczyść błąd dla tego pola
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors({ avatar: "Obraz nie może być większy niż 5MB" });
        return;
      }

      if (!file.type.startsWith("image/")) {
        setErrors({ avatar: "Plik musi być obrazem" });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        handleChange("avatar", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-surface rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-white">Edytuj profil</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 rounded-lg hover:bg-[#121212] transition-colors"
            aria-label="Zamknij modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="w-16 h-16 rounded-full border-4 border-[#00eeff]/30 object-cover"
              />
              <label className="absolute bottom-0 right-0 p-2 bg-[#00eeff] rounded-full cursor-pointer hover:bg-[#00eeff]/80 transition-colors">
                <Upload className="w-4 h-4 text-black" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  disabled={isSubmitting}
                />
              </label>
            </div>
            {errors.avatar && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.avatar}</span>
              </div>
            )}
            <p className="text-xs text-gray-400 text-center">
              Kliknij ikonę, aby zmienić avatar (max. 5MB, JPG/PNG)
            </p>
          </div>

          {/* Name */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Imię i nazwisko <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-all ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-700 focus:border-[#00eeff]"
              }`}
              placeholder="np. Dr. Jan Kowalski"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Bio / Opis
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={4}
              maxLength={500}
              className={`w-full px-4 py-3 rounded-lg border transition-all resize-none ${
                errors.bio
                  ? "border-red-500"
                  : "border-gray-700 focus:border-[#00eeff]"
              }`}
              placeholder="Napisz krótko o sobie i swoich zainteresowaniach badawczych..."
              disabled={isSubmitting}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.bio && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.bio}
                </p>
              )}
              <p
                className="text-xs ml-auto"
                style={{ color: "var(--text-secondary)" }}
              >
                {formData.bio.length}/500 znaków
              </p>
            </div>
          </div>

          {/* Field */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Dziedzina badań
            </label>
            <input
              type="text"
              value={formData.field}
              onChange={(e) => handleChange("field", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:border-[#00eeff] transition-all"
              placeholder="np. Quantum Computing, Machine Learning"
              disabled={isSubmitting}
            />
          </div>

          {/* Location */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Lokalizacja
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:border-[#00eeff] transition-all"
              placeholder="np. Warszawa, Polska"
              disabled={isSubmitting}
            />
          </div>

          {/* Website */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Strona internetowa
            </label>
            <input
              type="text"
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-all ${
                errors.website
                  ? "border-red-500"
                  : "border-gray-700 focus:border-[#00eeff]"
              }`}
              placeholder="https://example.com lub example.com"
              disabled={isSubmitting}
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.website}
              </p>
            )}
            <p
              className="mt-1 text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              URL zostanie automatycznie sformatowany z https:// jeśli nie
              zostanie podany
            </p>
          </div>

          {/* Actions */}
          <div
            className="flex items-center justify-end gap-3 pt-4 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all disabled:opacity-50"
              style={{
                backgroundColor: "transparent",
              }}
            >
              Anuluj
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#00eeff] to-[#5d8aa8] text-[#121212] font-semibold hover:shadow-[0_0_20px_rgba(0,238,255,0.4)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Zapisywanie...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Zapisz zmiany</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

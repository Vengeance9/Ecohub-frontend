"use client";
import { getCategoriesAction } from "@/_actions/category.action";
import { submitIdeaAction } from "@/_actions/idea.action";
import { Button } from "@/components/ui/button";
import { IFormData } from "@/interfaces/ideas.interface";
import { ideaSchema } from "@/lib/schemas/idea.schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Divide,
  Upload,
  X,
  DollarSign,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";



export default function Page() {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({}); 
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesAction(),
  });

  const {
    mutate: submitIdea,
    isPending,
    isSuccess,
    isError: submissionError,
    error: submissionErrorMessage,
    reset: resetSubmission,
  } = useMutation({
    mutationFn: (data: FormData) => submitIdeaAction(data),
    onSuccess: () => {
      setFormData({
        title: "",
        description: "",
        problem: "",
        solution: "",
        isPaid: false,
        price: undefined,
        categoryId: "",
      });
      setPhoto(null);
      setPreview(null);
      toast.success("Idea submitted successfully");
      setTimeout(() => resetSubmission(), 3000);
    },
    
  });

  const [formData, setFormData] = useState<IFormData>({
    title: "",
    description: "",
    problem: "",
    solution: "",
    isPaid: false,
    price: undefined,
    categoryId: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string >("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPhoto(file);
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setPreview(photoUrl);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({})

    const result = ideaSchema.safeParse({
      ...formData,
      price: formData.isPaid ? Number(formData.price) : undefined,
    })

    if(!result.success){
      const errors:Record<string,string> = {}

      result.error.issues.forEach((err) => {
        const field = err.path[0] as string
        errors[field] = err.message
      });
      setValidationErrors(errors)
      console.log(validationErrors)
      toast.error("Please fix the errors in the form"); 
      return
    }

    if (!photo) {
      setValidationErrors({ photo: "Photo is required" });
      toast.error("Please provide photo"); 
      return;
    }
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("problem", formData.problem);
    data.append("solution", formData.solution);
    data.append("isPaid", String(formData.isPaid));
    if (formData.isPaid && formData.price) {
      data.append("price", String(formData.price));
    }
    data.append("categoryId", formData.categoryId);
    data.append("photo", photo);
    submitIdea(data);
  };
  const [photoError, setPhotoError] = useState(false);
  

useEffect(() => {
  if (photo && photo.size > 1 * 1024 * 1024) {
    setPhotoError(true);
 
    const timer = setTimeout(() => {
      setPhotoError(false);
    }, 4000);

    return () => clearTimeout(timer);
  }
}, [photo]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
      <div className="container max-w-3xl mx-auto">
        {/* Success Message */}

        {/* Error Message */}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Share Your Idea</h1>
            <p className="text-green-100 mt-2">
              Help make the world a better place with your innovation
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a catchy title for your idea"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
              {validationErrors.title && (
                <p className="text-red-500 text-sm mt-1 font-medium">
                  {validationErrors.title}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="categoryId"
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                <option value="">-- Select Category --</option>
                {categoriesLoading ? (
                  <option disabled>Loading categories...</option>
                ) : (
                  categories?.data?.map((cat: any) => (
                    <option value={cat.id} key={cat.id}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Problem */}
            <div>
              <label
                htmlFor="problem"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Problem Statement <span className="text-red-500">*</span>
              </label>
              <textarea
                id="problem"
                name="problem"
                required
                rows={3}
                value={formData.problem}
                onChange={handleChange}
                placeholder="What problem does your idea solve?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>
            {validationErrors.problem && (
              <p className="text-red-500 text-sm mt-1 font-medium">
                {validationErrors.problem}
              </p>
            )}

            {/* Solution */}
            <div>
              <label
                htmlFor="solution"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Proposed Solution <span className="text-red-500">*</span>
              </label>
              <textarea
                id="solution"
                name="solution"
                required
                rows={3}
                value={formData.solution}
                onChange={handleChange}
                placeholder="How does your idea solve the problem?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>
            {validationErrors.solution && (
              <p className="text-red-500 text-sm mt-1 font-medium">
                {validationErrors.solution}
              </p>
            )}

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed description of your idea..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>
            {validationErrors.description && (
              <p className="text-red-500 text-sm mt-1 font-medium">
                {validationErrors.description}
              </p>
            )}

            {/* Is Paid Toggle */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input
                id="isPaid"
                name="isPaid"
                type="checkbox"
                checked={formData.isPaid}
                onChange={handleChange}
                className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isPaid"
                className="text-sm font-semibold text-gray-700"
              >
                This is a premium idea
              </label>
            </div>
            {validationErrors.isPaid && (
              <p className="text-red-500 text-sm mt-1 font-medium">
                {validationErrors.isPaid}
              </p>
            )}

            {/* Price (conditional) */}
            {formData.isPaid && (
              <div className="animate-in fade-in duration-200">
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="price"
                    name="price"
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price || ""}
                    onChange={handleChange}
                    placeholder="Price must be greater than 70"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {validationErrors.price && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      {validationErrors.price}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Photo <span className="text-red-500">*</span>
              </label>
              {!preview ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                    Creating Idea...
                  </>
                ) : (
                  "Share Your Idea"
                )}
              </Button>
            </div>
          </form>
        </div>

        {submissionError && (
          <div className="mb-6 mt-5 p-4 bg-red-100 border border-red-400 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800 font-medium">
              {(submissionErrorMessage as Error)?.message ??
                "Something went wrong"}
            </p>
          </div>
        )}
        {photoError && (
          <div className="mb-6 mt-5 p-4 bg-red-100 border border-red-400 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800 font-medium">
              File size is too big.Limit is 1 MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

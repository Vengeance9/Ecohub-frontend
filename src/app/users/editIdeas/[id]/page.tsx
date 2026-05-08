"use client";
import { getCategoriesAction } from "@/_actions/category.action";
import {
  getIdeaByIdAction,
  submitIdeaAction,
  updateIdeasAction,
} from "@/_actions/idea.action";
import { Button } from "@/components/ui/button";
import { IFormData } from "@/interfaces/ideas.interface";
import { errorHandler } from "@/lib/onSuccess";
import { ideaSchema } from "@/lib/schemas/idea.schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Upload,
  X,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";



export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [message, setMessage] = useState<string>("");

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesAction(),
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["idea", id],
    queryFn: () => getIdeaByIdAction(id as string),
  });

  const {
    mutate: updateIdea,
    isPending,
    isSuccess,
    isError: submissionError,
    error: submissionErrorMessage,
    reset: resetSubmission,
  } = useMutation({
    mutationFn: (data: FormData) => updateIdeasAction(data, id as string),
    onSuccess: () => {
      setTimeout(() => {
        router.push(`/ideaDetails/${id}`);
      }, 2000);
    },
    onError:(error:any)=>errorHandler({error,setMessage})
  });

  console.log('This is the submission error',message)

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
  const [existingPhoto, setExistingPhoto] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (data?.data?.result) {
      const idea = data.data.result;
      setFormData({
        title: idea.title,
        description: idea.description,
        problem: idea.problem,
        solution: idea.solution,
        isPaid: idea.isPaid,
        price: idea.price,
        categoryId: idea.categoryId,
      });
      setExistingPhoto(idea.photo);
      setPreview(idea.photo);
      setFeedback(idea.feedback);
    }
  }, [data]);

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
    setExistingPhoto(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({})
    const result = ideaSchema.safeParse({
      ...formData,
      price:formData.isPaid?Number(formData.price):undefined
    })
    if(!result.success){
      const errors:Record<string,string> = {}

      result.error.issues.forEach(err => {
        const field = err.path[0] as string
        errors[field] = err.message
      });
      setValidationErrors(errors)
      console.log(validationErrors)
      toast.error("Please fix the errors in the form"); 
      return
    }
    if(!photo){
     
      toast.error("Please provide photo"); 
      return
    }
    if(photo && photo.size > 1 * 1024 * 1024){
      
      toast.error("Photo size should be less than 1MB"); 
      return
      
    }
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("problem", formData.problem);
    formDataToSend.append("solution", formData.solution);
    formDataToSend.append("isPaid", String(formData.isPaid));
    if (formData.isPaid && formData.price) {
      formDataToSend.append("price", String(formData.price));
    }
    formDataToSend.append("categoryId", formData.categoryId);
    if (photo) {
      formDataToSend.append("photo", photo);
    }
    updateIdea(formDataToSend);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading idea details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Error Loading Idea
          </h2>
          <p className="text-gray-600">
            Could not load the idea details. Please try again.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const raw = data?.data?.result.feedback;

  let cleanFeedback = raw;

  let StringifiedFeedback = JSON.stringify(cleanFeedback);

  try {
    cleanFeedback = JSON.parse(raw);
  } catch {}

  console.log("cleanFeedback", cleanFeedback);
  console.log("Stringified cleandFeedback",JSON.stringify(cleanFeedback))

  let photoError = false;

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
      <div className=" max-w-3xl mx-auto">
        {feedback && (
          <div className="mb-8">
            <div>
              <span className="font-bold text-red-300">
                FeedBack from admin:{" "}
              </span>
              <br />
              {cleanFeedback.split("\n").map((line: any, i: any) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          </div>
        )}
        <br />
        <br />

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Edit Your Idea</h1>
            <p className="text-green-100 mt-2">
              Update and improve your innovation
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
                <p className="text-red-500 text-sm mt-1">
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
              {validationErrors.problem && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.problem}
                </p>
              )}
            </div>

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
              {validationErrors.solution && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.solution}
                </p>
              )}
            </div>

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
              {validationErrors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.description}
                </p>
              )}
            </div>

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
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {validationErrors.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.price}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Photo
              </label>
              {!preview ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload a new image
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
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {existingPhoto && !photo
                      ? "Current image shown"
                      : "New image preview"}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Edits"
                )}
              </Button>
            </div>
          </form>
        </div>
        {/* Success Message */}
        {isSuccess && (
          <div className="mb-6 p-4 mt-3 bg-green-100 border border-green-400 rounded-lg flex items-center gap-3 animate-in slide-in-from-top-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">
              Idea updated successfully! Redirecting...
            </p>
          </div>
        )}

        {/* Error Message */}
        {submissionError && (
          <div className="mb-6 mt-3 p-4 bg-red-100 border border-red-400 rounded-lg flex items-center gap-3">
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

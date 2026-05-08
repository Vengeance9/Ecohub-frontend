
import { axiosClient } from "@/lib/axios/httpClient";
import { catchAsyncFrontend } from "@/lib/shared/catchAsync";

export const getCategories = catchAsyncFrontend(
 async () => {
  const result = await axiosClient.httpGet("/ideas/getCategories");
  console.log("RESULT_________", result);
  return result;
})

export const createCategory = catchAsyncFrontend(
async (name: string) => {
  const result = await axiosClient.httpPost("/admin/create-category", { name });
  return result;
})

import { axiosClient } from "@/lib/axios/httpClient"
import { catchAsyncFrontend } from "@/lib/shared/catchAsync"

export const subscribe = catchAsyncFrontend(async (email: string) => {
  const result = await axiosClient.httpPatch(`/auth/subscribe`, { email });
  return result;
});


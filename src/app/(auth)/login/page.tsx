import { LoginForm } from "@/components/auth/login-form"
import { LoginParams } from "@/interfaces/auth.interface";



export default async function Page({searchParams}:LoginParams) {
  const params = await searchParams;
  return (
    
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm redirectPath={params.redirect} />
      </div>
    </div>
  )
}

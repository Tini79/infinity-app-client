"use client"
import { loginUser } from "@/app/lib/actions";
import { handleSave } from "@/app/lib/config";
import Button from "@/app/ui/components/button";
import { crimsonText } from "@/app/ui/fonts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";

export default function Login() {
  const [state, formAction] = useFormState(loginUser, null)
  handleSave(state)
  if (state) {
    redirect("/")
  }
  return (
    <>
      <section className="bg-bs-third--lighter h-screen flex justify-center items-center">
        <div className="bg-white lg:p-10 sm:p-[30px] p-5 xl:w-[35%] lg:w-[40%] md:w-1/2 w-3/4">
          <div className="lg:mb-10 sm:mb-[30px] mb-5 text-center">
            <span className={`${crimsonText.className} lg:text-[30px] sm:text-[28px] text-[26px] font-bold`}>Login Form</span>
          </div>
          <form action={formAction}>
            <>
              <div>
                <div className="lg:mb-4 sm:mb-[14px] mb-2">
                  <label htmlFor="username" className="block lg:text-sm sm:text-xs text-[10px]">Username</label>
                  <input type="text" id="username" name="username" className="w-full md:border-2 border border-bs-third--lighter focus:outline-0 focus:border-bs-third py-0.5 px-1 lg:h-8 sm:h-[30px] h-7 lg:text-base sm:text-sm text-xs" />
                </div>
                <div className="">
                  <label htmlFor="password" className="block lg:text-sm sm:text-xs text-[10px]">Password</label>
                  <input  type="password" id="password" name="password" className="w-full md:border-2 border border-bs-third--lighter focus:outline-0 focus:border-bs-third py-0.5 px-1 lg:h-8 sm:h-[30px] h-7 lg:text-base sm:text-sm text-xs" />
                </div>
              </div>
            </>
            <div className="lg:mt-10 sm:mt-[30px] mt-5">
              {/* <button formAction={formAction}>click me</button> */}
              <Button btnType="auth-btn-group"></Button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
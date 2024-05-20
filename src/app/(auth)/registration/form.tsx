"use client"
import { useFormState } from "react-dom";
import { registerUser } from "@/app/lib/actions";
import Button from "@/app/ui/components/button";

export default function CountrySelection({ data }: { data: any }) {
  const [state, formAction] = useFormState(registerUser, null)
  let errorMsg = ""
  if (state) {
    if (state.error) errorMsg = state.error
  }
  return (
    <>
      {errorMsg && (
        <div className="bg-red-500 text-white md:p-2 p-1">
          {errorMsg}
        </div>
      )}
      <form action={formAction} className="lg:mt-5 sm:mb-[15px] mb-2.5">
        <>
          {/* TODO: ukuran dari para input kagak sama nih lebarnya */}
          <div>
            <div className="sm:flex gap-4 w-full">
              <div className="w-full lg:mb-4 sm:mb-[14px] mb-2">
                <label htmlFor="fullName" id="fullNameLabel" className="block lg:text-sm sm:text-xs text-[10px]">Full Name</label>
                <input required type="text" aria-labelledby="fullNameLabel" id="fullName" name="full_name" className="w-full md:border-2 border border-bs-third--lighter focus:outline-0 focus:border-bs-third py-0.5 px-1 lg:h-8 sm:h-[30px] h-7 lg:text-base sm:text-sm text-xs" />
              </div>
              <div className="w-full lg:mb-4 sm:mb-[14px] mb-2">
                <label htmlFor="username" id="usernameLabel" className="block lg:text-sm sm:text-xs text-[10px]">Username</label>
                <input required type="text" aria-labelledby="fullNameLabel" id="username" name="username" className="w-full md:border-2 border border-bs-third--lighter focus:outline-0 focus:border-bs-third py-0.5 px-1 lg:h-8 sm:h-[30px] h-7 lg:text-base sm:text-sm text-xs" />
              </div>
            </div>
            <div className="sm:flex gap-4">
              <div className="w-full lg:mb-4 sm:mb-[14px] mb-2">
                <label htmlFor="gender" id="genderLabel" className="block lg:text-sm sm:text-xs text-[10px]">Gender</label>
                <select required name="gender" aria-labelledby="genderLabel" id="gender" className="w-full md:border-2 border border-bs-third--lighter focus:outline-0 focus:border-bs-third py-0.5 px-1 lg:h-8 sm:h-[30px] h-7 lg:text-base sm:text-sm text-xs" >
                  <option value=""></option>
                  <option value="F" className="lg:text-base sm:text-sm text-xs">Female</option>
                  <option value="M" className="lg:text-base sm:text-sm text-xs">Male</option>
                </select>
              </div>
              <div className="w-full lg:mb-4 sm:mb-[14px] mb-2">
                <label htmlFor="country" id="countryLabel" className="block lg:text-sm sm:text-xs text-[10px]">Country</label>
                <select required name="country" aria-labelledby="countryLabel" id="country" className="w-full md:border-2 border border-bs-third--lighter focus:outline-0 focus:border-bs-third py-0.5 px-1 lg:h-8 sm:h-[30px] h-7 lg:text-base sm:text-sm text-xs" >
                  <option value=""></option>
                  {data.map((country: any) => (
                    <option key={country.id} value={country.iso2} className="lg:text-base sm:text-sm text-xs">{country.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:flex gap-4">
              <div className="w-full lg:mb-4 sm:mb-[14px] mb-2">
                <label htmlFor="email" id="emailLabel" className="block lg:text-sm sm:text-xs text-[10px]">Email</label>
                <input required type="email" aria-labelledby="emailLabel" id="email" name="email" className="w-full md:border-2 border border-bs-third--lighter focus:outline-0 focus:border-bs-third py-0.5 px-1 lg:h-8 sm:h-[30px] h-7 lg:text-base sm:text-sm text-xs" />
              </div>
              <div className="w-full lg:mb-4 sm:mb-[14px] mb-2">
                <label htmlFor="password" id="passwordLabel" className="block lg:text-sm sm:text-xs text-[10px]">Password</label>
                <input required type="password" aria-labelledby="passwordLabel" id="password" name="password" className="w-full md:border-2 border border-bs-third--lighter focus:outline-0 focus:border-bs-third py-0.5 px-1 lg:h-8 sm:h-[30px] h-7 lg:text-base sm:text-sm text-xs" />
              </div>
            </div>
          </div>
        </>
        <div className="lg:mt-10 sm:mt-[30px] mt-5">
          <Button btnType="auth-btn-group" />
        </div>
      </form>
    </>
  )
}
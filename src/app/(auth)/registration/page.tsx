import Button from "../../ui/components/button";
import { crimsonText } from "../../ui/fonts";
import { registerUser } from "@/app/lib/actions";
import { getCountries } from "@/app/lib/data";

export default async function Registration() {
  const countries = await getCountries()
  return (
    <>
      <section className="bg-bs-third--lighter h-screen flex justify-center items-center">
        <div className="bg-white lg:p-10 sm:p-[30px] p-5 xl:w-1/2 md:w-2/3 w-3/4">
          <div className="lg:mb-10 sm:mb-[30px] mb-5 text-center">
            <span className={`${crimsonText.className} lg:text-[30px] sm:text-[28px] text-[26px] font-bold`}>Registration Form</span>
          </div>
          <form action={registerUser}>
            <>
              {/* TODO: ukuran dari para input kagak sama nih lebarnya */}
              <div>
                <div className="sm:flex gap-4 w-full">
                  <div className="w-full lg:mb-4 sm:mb-[14px] mb-2">
                    <label htmlFor="fullName" className="block lg:text-sm sm:text-xs text-[10px]">Full Name</label>
                    <input required type="text" id="fullName" name="full_name" className="w-full md:border-2 border border-bs-third--lighter focus:outline-0 focus:border-bs-third py-0.5 px-1 lg:h-8 sm:h-[30px] h-7 lg:text-base sm:text-sm text-xs" />
                  </div>
                  <div className="w-full lg:mb-4 sm:mb-[14px] mb-2">
                    <label htmlFor="username" className="block lg:text-sm sm:text-xs text-[10px]">Username</label>
                    <input required type="text" id="username" name="username" className="w-full md:border-2 border border-bs-third--lighter focus:outline-0 focus:border-bs-third py-0.5 px-1 lg:h-8 sm:h-[30px] h-7 lg:text-base sm:text-sm text-xs" />
                  </div>
                </div>
                <div className="sm:flex gap-4">
                  <div className="w-full lg:mb-4 sm:mb-[14px] mb-2">
                    <label htmlFor="gender" className="block lg:text-sm sm:text-xs text-[10px]">Gender</label>
                    <select required name="gender" id="gender" className="w-full md:border-2 border border-bs-third--lighter focus:outline-0 focus:border-bs-third py-0.5 px-1 lg:h-8 sm:h-[30px] h-7 lg:text-base sm:text-sm text-xs" >
                      <option value=""></option>
                      <option value="F" className="lg:text-base sm:text-sm text-xs">Female</option>
                      <option value="M" className="lg:text-base sm:text-sm text-xs">Male</option>
                    </select>
                  </div>
                  <div className="w-full lg:mb-4 sm:mb-[14px] mb-2">
                    <label htmlFor="country" className="block lg:text-sm sm:text-xs text-[10px]">Country</label>
                    <select required name="country" id="country" className="w-full md:border-2 border border-bs-third--lighter focus:outline-0 focus:border-bs-third py-0.5 px-1 lg:h-8 sm:h-[30px] h-7 lg:text-base sm:text-sm text-xs" >
                      <option value=""></option>
                      {countries.map((country: any) => (
                        <option key={country.id} value={country.iso2} className="lg:text-base sm:text-sm text-xs">{country.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="sm:flex gap-4">
                  <div className="w-full lg:mb-4 sm:mb-[14px] mb-2">
                    <label htmlFor="email" className="block lg:text-sm sm:text-xs text-[10px]">Email</label>
                    <input required type="email" id="email" name="email" className="w-full md:border-2 border border-bs-third--lighter focus:outline-0 focus:border-bs-third py-0.5 px-1 lg:h-8 sm:h-[30px] h-7 lg:text-base sm:text-sm text-xs" />
                  </div>
                  <div className="w-full lg:mb-4 sm:mb-[14px] mb-2">
                    <label htmlFor="password" className="block lg:text-sm sm:text-xs text-[10px]">Password</label>
                    <input required type="password" id="password" name="password" className="w-full md:border-2 border border-bs-third--lighter focus:outline-0 focus:border-bs-third py-0.5 px-1 lg:h-8 sm:h-[30px] h-7 lg:text-base sm:text-sm text-xs" />
                  </div>
                </div>
              </div>
            </>
            <div className="lg:mt-10 sm:mt-[30px] mt-5">
              <Button btnType="auth-btn-group"></Button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
import { crimsonText } from "../../ui/fonts";
import Form from "./form";
import { getCountries } from "@/app/lib/data";

export default async function Registration() {
  const countries = await getCountries()

  return (
    <>
      <section className="bg-bs-third--lighter h-screen flex justify-center items-center">
        <div className="bg-white lg:p-10 sm:p-[30px] p-5 xl:w-1/2 md:w-2/3 w-3/4">
          <div className="lg:mb-5 sm:mb-[15px] mb-2.5 text-center">
            <span className={`${crimsonText.className} lg:text-[30px] sm:text-[28px] text-[26px] font-bold`}>Registration Form</span>
          </div>
          <Form data={countries} />
        </div>
      </section>
    </>
  )
}
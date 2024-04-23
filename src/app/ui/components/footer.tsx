import Link from "next/link";
import Image from "next/image";
import NavLinks from "./navbar/navlinks";

export default function Footer() {
  const { contacts, navMenus } = require("@/app/lib/placeholder-data")

  const categories = [
    { name: "Tri Hita Karana Bracelets", href: "/" },
  ]

  return (
    <>
      {/* TODO: inget tambahkan garis bawah pada setiap span di sini, klo bisa pakai underline untuk atur mb biar sesuai design, that's good! */}
      <footer className="text-bs-secondary--lighter lg:mt-10 sm:mt-[30px] mt-5">
        <nav className="bg-bs-primary lg:flex lg:py-[120px] sm:!py-[90px] py-[60px] lg:px-10 sm:px-[30px] px-5">
          <div className="flex-initial lg:w-2/6 w-full lg:mb-0 mb-14">
            <Image src="/imgs/brand-logo.png" alt="Infinity Pritty Jewellery Logo" width={282} height={133} className="xl:w-[282px] md:w-[232px] w-[202px] xl:h-[133px] md:h-[109px] h-[97px] lg:mx-0 mx-auto"></Image>
          </div>
          <div className="flex-initial lg:w-4/6 w-full md:flex gap-10">
            <NavLinks footerMenus={categories} footerMenuTitle="Categories" customCls="flex-initial lg:w-1/4 w-full md:mb-0 mb-10" />
            <NavLinks footerMenus={navMenus} footerMenuTitle="Navigations" customCls="flex-initial lg:w-1/4 w-full md:mb-0 mb-10" />
            <NavLinks footerMenus={contacts} footerMenuTitle="Contacts" hasIcon customCls="flex-initial lg:w-2/4 w-full lg:mb-0" />
          </div>
        </nav>
        <div className="bg-bs-primary--darker text-center lg:py-1 sm:py-0.5 py-0.5">
          <span className="lg:text-sm sm:text-xs text-[10px]">&copy; 2024️ <Link href="/" className="hover:text-bs-secondary--darker">Infinity Pritty Jewellery</Link>. All rights reserved</span>
        </div>
      </footer>
    </>
  )
}
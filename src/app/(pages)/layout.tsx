import Footer from "../ui/components/navigations/footer/footer";
import Navbar from "../ui/components/navigations/navbar/navbar";

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </>
  )
}
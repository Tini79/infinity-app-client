import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const contacts = [
  {
    icon: faPhone,
    href: "+62881038440302",
    value: "+62 881-0384-40302",
    isPhone: true,
    name: "+62 8810 3844 0302"
  },
  {
    icon: faEnvelope,
    href: "admin@infinityprittyjewellery.com",
    value: "admin@infinityprittyjewellery.com",
    isEmail: true,
    name: "admin@infinityprittyjewellery.com"
  },
  {
    icon: faWhatsapp,
    href: "https://wa.me/+62881038440302",
    name: "+62 8810 3844 0302"
  },
  {
    icon: faInstagram,
    href: "https://www.instagram.com/infinityprittyjewellery",
    name: "infinityprittyjewellery"
  }
]

const navMenus = [
  {
    name: "Home",
    href: "/"
  },
  {
    name: "Categories",
    href: "/#productCategoriesSection"
  },
  {
    name: "Testimonials",
    href: "/#testimonialsSection"
  },
  {
    name: "Blog",
    href: "/"
  },
]

const categories = [
  {
    name: "Tri Hita Karana Bracelets",
    href: "tri-hita-karana-bracelets"
  },
  {
    name: "Red String Bracelets",
    href: "red-string-bracelets"
  },
  {
    name: "Chipstone Bracelets",
    href: "chipstone-bracelets"
  }
]

const materialDescTitle = [{
  "triHitaKaranaBracelets": "The Tri Hita Karana bracelets is crafted with mindful attention to the Balinese philosophy, reflected in the materials we choose."
}]

const triHitaKarana = [
  {
    "id": 1,
    "name": "Parahyangan",
    "desc": "Harmony between humans and the divine"
  },
  {
    "id": 2,
    "name": "Pawongan",
    "desc": "Harmony between humans and other humans"
  },
  {
    "id": 3,
    "name": "Palemahan",
    "desc": "Harmony between humans and nature"
  },
]

const slug = [
  { "triHitaKaranaBracelets": "tri-hita-karana-bracelets" }
]

module.exports = {
  contacts,
  navMenus,
  categories,
  materialDescTitle,
  triHitaKarana,
  slug
}
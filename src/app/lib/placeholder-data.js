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

module.exports = {
  contacts,
  navMenus
}
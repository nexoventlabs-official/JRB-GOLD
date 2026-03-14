import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/about#story" },
    { name: "Craftsmanship", href: "/about#craft" },
    { name: "Contact Us", href: "/contact" },
  ];

  const shopLinks = [
    { name: "Gold Jewelry", href: "/shop?category=gold" },
    { name: "Silver Collection", href: "/shop?category=silver" },
    { name: "Coins", href: "/shop?category=coins" },
    { name: "New Arrivals", href: "/shop?category=new" },
  ];


  const helpLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/about#faq" },
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-conditions" },
    { name: "Cancellation & Refund", href: "/cancellation-refund" },
  ];

  return (
    <footer className="bg-ink text-ivory">
      {/* Newsletter Section */}
      <div className="bg-gray-900 text-white py-8 xs:py-10 lg:py-12">
        <div className="container mx-auto">
          <div className="text-center">
            <h3 className="text-xl xs:text-2xl lg:text-3xl font-playfair font-bold mb-3 xs:mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-sm xs:text-base mb-4 xs:mb-6 max-w-xl lg:max-w-2xl mx-auto leading-relaxed">Stay updated with our latest collections, exclusive offers, and jewelry care tips</p>
            <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 max-w-sm xs:max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-600 focus:border-white text-white placeholder-gray-400 text-sm xs:text-base"
              />
              <Button className="bg-white hover:bg-gray-200 text-gray-900 text-sm xs:text-base px-4 xs:px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto py-8 xs:py-10 lg:py-12">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
            {/* Company Column */}
            <div>
              <a href="/about#about" className="hover:no-underline">
                <h3 className="text-base xs:text-lg font-playfair font-semibold mb-4 xs:mb-6 text-yellow-500 hover:text-yellow-400 transition-colors">
                  Company
                </h3>
              </a>
              <ul className="space-y-2 xs:space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm xs:text-base text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shop Column */}
            <div>
              <a href="/shop" className="hover:no-underline">
                <h3 className="text-base xs:text-lg font-playfair font-semibold mb-4 xs:mb-6 text-yellow-500 hover:text-yellow-400 transition-colors">
                  Shop
                </h3>
              </a>
              <ul className="space-y-2 xs:space-y-3">
                {shopLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm xs:text-base text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>


            {/* Help Column */}
            <div>
              <a href="/contact" className="hover:no-underline">
                <h3 className="text-base xs:text-lg font-playfair font-semibold mb-4 xs:mb-6 text-yellow-500 hover:text-yellow-400 transition-colors">
                  Help
                </h3>
              </a>
              <ul className="space-y-2 xs:space-y-3 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-1 gap-x-4">
                {helpLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm xs:text-base text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-ivory/20 mt-8 xs:mt-10 lg:mt-12 pt-6 xs:pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-6 text-center lg:text-left">
              <div className="flex flex-col xs:flex-row items-center justify-center lg:justify-start">
                <Phone className="h-4 w-4 xs:h-5 xs:w-5 text-yellow-500 mb-2 xs:mb-0 xs:mr-3" />
                <div>
                  <div className="font-semibold text-sm xs:text-base">Call Us</div>
                  <div className="text-ivory/80 text-sm xs:text-base">+91 82204 21317</div>
                </div>
              </div>

              <div className="flex flex-col xs:flex-row items-center justify-center lg:justify-start">
                <Mail className="h-4 w-4 xs:h-5 xs:w-5 text-yellow-500 mb-2 xs:mb-0 xs:mr-3" />
                <div>
                  <div className="font-semibold text-sm xs:text-base">Email</div>
                  <div className="text-ivory/80 text-sm xs:text-base">jrbgoldprivateltd@gmail.com</div>
                  <div className="text-ivory/80 text-sm xs:text-base">inforjrb@gmail.com</div>
                </div>
              </div>

              <div className="flex flex-col xs:flex-row items-center xs:items-start justify-center lg:justify-start">
                <MapPin className="h-4 w-4 xs:h-5 xs:w-5 text-yellow-500 mb-2 xs:mb-0 xs:mr-3 xs:mt-1" />
                <div>
                  <div className="font-semibold text-sm xs:text-base">Address</div>
                  <div className="text-ivory/80 text-xs xs:text-sm leading-relaxed">
                    No: 1539, 1st Floor,<br />
                    Soundar Complex, Vellore Road<br />
                    Near Anna Arch<br />
                    Thiruvannamalai<br />
                    Tamil Nadu - 606604
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 xs:space-x-6 mt-6 xs:mt-8">
            <a
              href="https://www.facebook.com/jrbgold"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/80 hover:text-yellow-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 xs:h-6 xs:w-6" />
            </a>
            <a
              href="https://www.instagram.com/jrbgold"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/80 hover:text-yellow-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 xs:h-6 xs:w-6" />
            </a>
            <a
              href="https://wa.me/918220421317"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/80 hover:text-yellow-500 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5 xs:h-6 xs:w-6" />
            </a>
          </div>

          {/* Help Links */}
          <div className="border-t border-ivory/20 mt-6 xs:mt-8 pt-6 xs:pt-8">
            <div className="flex flex-wrap justify-center gap-3 xs:gap-4 lg:gap-6 text-xs xs:text-sm text-ivory/80">
              {helpLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-yellow-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 xs:mt-8 text-center text-ivory/60 text-xs xs:text-sm">
            &copy; {new Date().getFullYear()} JRB Gold. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
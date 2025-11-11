import {
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa6";
import MyContainer from "../MyContainer/MyContainer";
import { Link } from "react-router";
import logo from "/logo.png";
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-[#0d3c3b] to-[#0f7c76] text-gray-200 px-6 md:px-20 py-12 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-30"></div>

      <MyContainer>
        <div className="relative grid md:grid-cols-3 gap-12 z-10">
          {/* --- Left Section --- */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Link to="/" className="flex items-center gap-2">
                <img className="h-8 w-8" src={logo} alt="" />
                <span className="text-2xl font-bold text-[#0f7c76]">
                  ModelVault
                </span>
              </Link>
            </div>

            <p className="text-sm leading-relaxed text-gray-300 mb-6">
              Empowering physicians with advanced multi-modal tools to improve
              treatment selection and patient outcomes.
            </p>

            <div className="flex items-center gap-4 mb-6">
              <a href="#" className="hover:text-yellow-400 transition">
                <FaXTwitter />
              </a>
              <a href="#" className="hover:text-yellow-400 transition">
                <FaLinkedinIn />
              </a>
              <a href="#" className="hover:text-yellow-400 transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-yellow-400 transition">
                <FaFacebookF />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="border border-gray-400 px-4 py-2 rounded-md text-sm uppercase tracking-wide hover:bg-yellow-400 hover:text-black transition"
            >
              ↑ Back to top
            </button>
          </div>

          {/* --- Middle Section --- */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Site Map</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Homepage
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Technology
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Ataraxis Breast
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Resources & News
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Portal
                </a>
              </li>
            </ul>
          </div>

          {/* --- Right Section --- */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Terms of Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Lawyer's Corners
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* --- Bottom Bar --- */}
        <div className="bg-yellow-500 text-black text-center text-xs font-semibold py-2 mt-10 rounded-b-2xl">
          Copyright © 2025, Site name. All Rights Reserved.
        </div>
      </MyContainer>
    </footer>
  );
};

export default Footer;

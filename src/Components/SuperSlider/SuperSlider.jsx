import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import "animate.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const slidesData = [
  {
    id: 1,
    title: "Manage Models like a Pro",
    subtitle:
      "Organize, version and deploy AI models — a single hub for your ML lifecycle.",
    cta: { text: "Explore Models", to: "/models" },
    accent: "from-[#0d3c3b] to-[#0f7c76]",
    img: (
      <img
        src="https://i.ibb.co.com/fzxJT58D/photo-1593642632823-8f785ba67e45.jpg"
        alt="AI Models"
        className="w-40 h-40 object-cover rounded-lg shadow-lg"
      />
    ),
    subtitleClass: "text-white",
    animIn: "animate__fadeInLeft",
    animOut: "animate__fadeOutRight",
  },

  {
    id: 2,
    title: "Lightning Fast Versioning",
    subtitle:
      "Keep track of datasets, hyperparameters, and model checkpoints with rollbacks.",
    cta: { text: "Start Versioning", to: "/add-model" },
    accent: "from-[#0d3c3b] to-[#0f7c76]",
    img: (
      <img
        src="https://i.ibb.co.com/qFM58K2p/photo-1526779259212-939e64788e3c.jpg"
        alt="Versioning"
        className="w-40 h-40 object-cover rounded-lg shadow-lg"
      />
    ),
    animIn: "animate__fadeInUp",
    animOut: "animate__fadeOutDown",
  },

  {
    id: 3,
    title: "Secure & Shareable",
    subtitle:
      "Control access, publish model cards and share usage examples with colleagues.",
    cta: { text: "Publish Model", to: "/publish" },
    accent: "from-emerald-600 to-teal-600",
    img: (
      <img
        src="https://i.ibb.co.com/5gZb8Z0W/photo-1603791440384-56cd371ee9a7.jpg"
        alt="Secure & Shareable"
        className="w-40 h-40 object-cover rounded-lg shadow-lg"
      />
    ),
    animIn: "animate__fadeInRight",
    animOut: "animate__fadeOutLeft",
  },
];

const SuperSlider = ({ autoplay = true, interval = 4500 }) => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);
  const hoverRef = useRef(false);

  const goTo = (next) => {
    if (isAnimating) return;
    setIsAnimating(true);
    // small delay to allow CSS animation out (we use animate.css classes)
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIndex(next);
      setIsAnimating(false);
    }, 500); // matching animate.css duration (0.5s)
  };

  const next = () => goTo((index + 1) % slidesData.length);
  const prev = () => goTo((index - 1 + slidesData.length) % slidesData.length);

  useEffect(() => {
    if (!autoplay) return;
    const tick = () => {
      if (!hoverRef.current) next();
    };
    const id = setInterval(tick, interval);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, autoplay, interval]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div
      className="relative mx-auto rounded-2xl overflow-hidden shadow-2xl"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      aria-roledescription="carousel"
    >
      {/* Slides */}
      {/* Slides */}
      <div className="relative min-h-[340px] md:min-h-[420px]">
        {slidesData.map((s, i) => {
          const active = i === index;
          const baseAnim = active ? s.animIn : s.animOut;

          return (
            <section
              key={s.id}
              aria-hidden={!active}
              className={`absolute inset-0 flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 md:p-10 transition-opacity duration-500
          ${active ? "opacity-100" : "opacity-0 z-10 pointer-events-none"}
        `}
              style={{
                backgroundImage: `url(${
                  i === 0
                    ? "https://i.ibb.co.com/GfhT8jLn/Slide1.png"
                    : i === 1
                    ? "https://i.ibb.co.com/TpPDnGk/Slide2.png"
                    : "https://i.ibb.co.com/nM11QKM7/Screenshot-1.png"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* left: text */}
              <div
                className={`flex-1 max-w-xl ${
                  active ? `animate__animated ${baseAnim}` : ""
                }`}
              >
                <div
                  className={`inline-block mb-4 px-3 py-1 rounded-full text-sm font-semibold text-white bg-black/50`}
                >
                  Featured
                </div>

                <h2 className="text-2xl md:text-4xl font-extrabold mb-3 leading-tight text-white">
                  {s.title}
                </h2>

                <p className="text-white mb-6 max-w-xl">{s.subtitle}</p>

                <div className="flex items-center gap-3">
                  <Link
                    to={s.cta.to}
                    className="inline-flex items-center gap-2 btn px-5 py-2 rounded-full bg-black/60 text-white shadow-lg hover:scale-[1.02] transform transition"
                  >
                    {s.cta.text}
                  </Link>

                  <button
                    onClick={prev}
                    aria-label="Previous slide"
                    className="p-2 rounded-full border hover:shadow-md"
                  >
                    <IoChevronBack />
                  </button>

                  <button
                    onClick={next}
                    aria-label="Next slide"
                    className="p-2 rounded-full border hover:shadow-md"
                  >
                    <IoChevronForward />
                  </button>
                </div>
              </div>

              {/* right: visual */}
              <div
                className={`flex-1 flex justify-center md:justify-end ${
                  active ? `animate__animated ${baseAnim}` : ""
                }`}
              >
                <div className="bg-white/50 dark:bg-black/10 rounded-xl p-6 shadow-xl">
                  {s.img}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 ">
        {slidesData.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "w-7 bg-[#0d3c3b]" : "bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Top-left small logo (optional) */}
      <div className="absolute top-4 left-4 z-40">
        <div className="flex items-center gap-2 bg-white/80 dark:bg-black/20 px-3 py-1 rounded-full shadow-md">
          {/* small inline svg logo */}
          <svg
            className="h-6 w-6 text-[#0d3c3b]"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v3M12 19v3M4.2 4.2l2 2M17.8 17.8l2 2"
              stroke="#0d3c3b"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-sm font-semibold">AI ModelVault</span>
        </div>
      </div>
    </div>
  );
};

export default SuperSlider;

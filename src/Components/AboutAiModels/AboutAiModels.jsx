import React from "react";

const AboutAiModels = () => {
  return (
    <div>
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 text-gray-800">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#0d3c3b]">
              About AI <span className="text-[#0f7c76]">Models</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Understanding AI models is key to leveraging the power of machine
              learning in real-world applications.
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left: Image / Illustration */}
            <div className="flex-1 flex justify-center">
              <div className="rounded-3xl overflow-hidden shadow-xl hover:scale-105 transform transition duration-500">
                <img
                  src="https://i.ibb.co.com/wrCV2NJn/1.png"
                  alt="AI Illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: Text */}
            <div className="flex-1 space-y-6">
              <p className="text-lg md:text-lg leading-relaxed">
                AI models are algorithms that enable machines to learn from
                large datasets, identify patterns, and make predictions or
                decisions without explicit programming. They form the core of
                modern artificial intelligence applications, powering everything
                from natural language understanding to autonomous driving.
              </p>

              <p className="text-lg md:text-lg leading-relaxed">
                Neural networks, a popular type of AI model, mimic the
                interconnected structure of the human brain. They excel at
                handling complex tasks such as image recognition, speech
                processing, and predictive analytics. The flexibility of AI
                models allows businesses and researchers to deploy solutions in
                healthcare, finance, education, and entertainment.
              </p>

              <p className="text-lg md:text-lg leading-relaxed">
                Real-world use cases include chatbots for instant customer
                support, AI-powered diagnostics for medical imaging,
                recommendation engines in e-commerce, and predictive maintenance
                in manufacturing. With continuous advancements, AI models are
                becoming more accurate, efficient, and essential in our daily
                lives.
              </p>

              <button className="btn btn-primary-color text-white px-6 py-3 rounded-full hover:bg-[#0f7c76] transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutAiModels;

export default function AdminAbout() {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">About Me</h1>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src="/image3.jpg"
                alt="Eyob Wondmagegn"
                className="w-auto h-64 object-contain rounded-lg border-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
              <div className="prose prose-lg text-gray-800">
                <p>
                  I am Eyob Wondmagegn, a passionate Computer Science student at Woldia University. As an aspiring website developer, I am dedicated to crafting innovative and user-friendly digital experiences. My journey in the tech world began with a curiosity for coding, which has grown into a deep interest in web development, where I explore technologies to build responsive and dynamic websites.
                </p>
                <p>
                  At Woldia University, I am honing my skills in programming, problem-solving, and software design, with a focus on creating solutions that enhance accessibility and efficiency. Beyond academics, I enjoy experimenting with new frameworks and tools, contributing to projects that reflect my commitment to learning and growth in the field of technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
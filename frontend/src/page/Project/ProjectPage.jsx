import { Link } from "react-router-dom";
import { Github, Linkedin, X } from "lucide-react";
import Portfolio from "../Assets/Image/Portfolio.jpeg";
import Velora from "../Assets/Image/Velora.jpeg";
import SEO from "../Component/SEO";
import VCCE from "../Assets/Image/VCCE.jpeg";

function Project() {
  const projects = [
    {
      id: 0,
      title: "Velora || E-commerce",
      desc: "Front-end e-commerce website showcasing modern UX, product logic, and performance.",
      img: Velora,
      tech: [
        "HTML",
        "Tailwind CSS",
        "React",
        "React Router DOM",
        "Redux",
        "React Suite",
        "GitHub",
      ],
      src: "https://github.com/omid2007hope/Velora",
      liveDemo: "https://velorashop.app",
    },
    {
      id: 1,
      title: "Omid Teimory || Portfolio",
      desc: "Personal portfolio with case studies, resume, and contact workflows.",
      img: Portfolio,
      tech: [
        "HTML",
        "Tailwind CSS",
        "React",
        "React Router DOM",
        "Redux",
        "React Suite",
        "GitHub",
      ],
      src: "https://github.com/omid2007hope/Omid-Teimory",
      liveDemo: "https://omidteimory.com",
    },
    {
      id: 2,
      title: "Spectre",
      desc: "Project Spectre",
      // img: VCCE,
      tech: [
        "HTML",
        "Tailwind CSS",
        "React",
        "React Router DOM",
        "Redux",
        "React Suite",
        "GitHub",
        "node.js",
        "express.js",
      ],
      src: "https://github.com/omid2007hope/Data-Science-Project",
      liveDemo: "",
    },
  ];

  return (
    <>
      <SEO
        title="Projects"
        description="Selected React and Tailwind projects by Omid Teimory, showcasing e-commerce, portfolio design, and UI engineering. Open to work."
        keywords="React projects, Tailwind case studies, Omid Teimory portfolio, frontend projects, open to work"
        url="https://omidteimory.com/projects"
        breadcrumbItems={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
        ]}
      />
      <div className="w-full min-h-screen bg-[#0f172a] text-white px-6 py-20 flex justify-center">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Selected Projects
          </h1>
          <p className="text-white/70 text-lg mt-2 mb-10">
            A collection of my recent work, from personal projects to client
            applications. I am open to work and new collaborations.
          </p>

          <div className="flex gap-4 mb-10">
            {["All"].map((filter) => (
              <button
                key={filter}
                className="px-5 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition font-medium"
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition"
              >
                <Link to={`/project/${project.id}`}>
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-5">
                    <img
                      src={project.img}
                      alt={project.title}
                      width="640"
                      height="360"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h2 className="text-xl font-bold mt-3">{project.title}</h2>
                  <p className="text-white/60 mt-2 text-sm leading-relaxed">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg text-xs bg-white/10 border border-white/10 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>

                <div className="flex gap-4 mt-5">
                  <a
                    href={project.liveDemo || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-center ${
                      project.liveDemo
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-white/5 border border-white/10 cursor-not-allowed opacity-60"
                    }`}
                    aria-disabled={!project.liveDemo}
                    tabIndex={project.liveDemo ? undefined : -1}
                  >
                    {project.liveDemo ? "Live Demo" : "Live Demo (coming soon)"}
                  </a>

                  <a
                    href={project.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm font-semibold text-center"
                  >
                    Source
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-white/10 pt-8 flex flex-col items-center space-y-4">
            <div className="flex gap-10 text-white/70">
              <a href="/" className="hover:text-white transition">
                Home
              </a>
              <a href="/projects" className="hover:text-white transition">
                Projects
              </a>
              <a href="/about" className="hover:text-white transition">
                About
              </a>
              <a href="/contact" className="hover:text-white transition">
                Contact
              </a>
            </div>

            <div className="flex gap-6 pt-4">
              <a
                href="https://github.com/omid2007hope"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex justify-center items-center font-bold hover:bg-white/10 transition"
                aria-label="GitHub profile"
              >
                <Github />
              </a>

              <a
                href="https://www.linkedin.com/in/omid-teimory-48233638b"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex justify-center items-center font-bold hover:bg-white/10 transition"
                aria-label="LinkedIn profile"
              >
                <Linkedin />
              </a>

              <a
                href="https://x.com/Omid2007hope"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex justify-center items-center font-bold hover:bg-white/10 transition"
                aria-label="X profile"
              >
                <X />
              </a>
            </div>

            <p className="text-white/40 text-sm">
              Ac 2024 Omid Teimory. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Project;

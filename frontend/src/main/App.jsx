import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../component/layout/Header";

const Home = lazy(() => import("../page/HomePage"));
const About = lazy(() => import("../page/AboutPage"));
const Contact = lazy(() => import("../page/ContactPage"));
const Projects = lazy(() => import("../page/Project/ProjectPage"));
const Resume = lazy(() => import("../page/ResumePage"));
const ProjectShowcase = lazy(
  () => import("../page/Project/ProjectShowCasePage"),
);

function App() {
  return (
    <BrowserRouter>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="pt-20" role="main">
        <Suspense
          fallback={
            <div className="w-full py-16 text-center text-white">
              Loading page...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/project/:id" element={<ProjectShowcase />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}

export default App;

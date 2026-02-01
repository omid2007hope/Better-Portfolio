import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../Navigation/Header";

const Home = lazy(() => import("../Page/Home"));
const About = lazy(() => import("../Page/About"));
const Contact = lazy(() => import("../Page/Contact"));
const Projects = lazy(() => import("../Page/Project"));
const Resume = lazy(() => import("../Page/Resume"));
const ProjectShowcase = lazy(() => import("../Component/ProjectShowcase"));

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

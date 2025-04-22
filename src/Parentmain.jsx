import React, { useRef, useState, useEffect } from "react";
import { ComponentDocs } from "./LibData";
import Button from "./components/Button";
import Card from "./components/Card.jsx";
import Modal from "./components/Modal.jsx";
import { FaExpandAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import FullscreenViewer from "./FullscreenViewer";
import reactElementToJsxString from "react-element-to-jsx-string";
import CodeToggle from "./Module Main/CodeToggle.jsx";
import ComponentDocumentation from "./Module Main/ComponentDocumentation .jsx";

const componentMap = {
  Button,
  Card,
  Modal,
};

function Parentmain({ active }) {
  const componentRef = useRef(null);
  const [componentCode, setComponentCode] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const component = ComponentDocs.find((comp) => comp.title === active);

  if (!component) {
    return <div className="px-2 py-5 text-red-500">Component not found</div>;
  }

  const DynamicComponent = componentMap[component.title];

  if (!DynamicComponent) {
    return (
      <div className="px-2 py-5 text-yellow-500">
        This component exists in docs but has not been implemented yet.
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    if (componentRef.current) {
      const jsxString = reactElementToJsxString(
        <DynamicComponent component={component.id} />
      );
      setComponentCode(jsxString);
    }
  }, [componentRef.current, component.id]);

  useEffect(() => {
    // Set the active section to the first h3 when component changes
    if (component?.description) {
      const firstH3 = component.description.find((item) => item.type === "h3");
      if (firstH3) {
        setActiveSection(firstH3.content);
      }
    }
  }, [component]);

  // Helper function to render markdown-like content with proper formatting
  const renderFormattedContent = (content) => {
    if (!content) return null;

    // Handle bullet points
    if (content.includes("\n-")) {
      const items = content.split("\n-").filter((item) => item.trim());
      return (
        <ul className="list-disc pl-5 space-y-1 my-2 border-l-1 border-green-300/20 ">
          {items.map((item, i) => (
            <div key={i} className="text-gray-300">
              {item.trim()}
            </div>
          ))}
        </ul>
      );
    }

    // Handle normal text
    return content;
  };

  // Generate table of contents from h3 headings
  const tableOfContents =
    component?.description
      ?.filter((item) => item.type === "h3")
      .map((item) => item.content) || [];

  // Scroll to section when clicking on TOC item
  const scrollToSection = (sectionTitle) => {
    setActiveSection(sectionTitle);
    const element = document.getElementById(
      sectionTitle.replace(/\s+/g, "-").toLowerCase()
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="px-2 py-5 overflow-x-hidden relative">
      {/* Component Preview First */}
      {DynamicComponent && (
        <AnimatePresence mode="wait">
          {isFullscreen ? (
            <FullscreenViewer
              component={component.title}
              componentId={component.id}
              onClose={toggleFullscreen}
              code={componentCode}
            />
          ) : (
            <motion.div
              key="normal-view"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="relative border-2 border-white/10 rounded-md py-10 px-10 backdrop-blur-3xl bg-amber-50/80
                flex justify-center gap-10 overflow-y-visible shadow-lg mb-8"
            >
              {/* Component wrapper with ref */}
              <div ref={componentRef}>
                <DynamicComponent component={component.id} />
              </div>

              {/* Fullscreen trigger */}
              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={toggleFullscreen}
                className="absolute right-5 top-5 shadow shadow-zinc-600 hover:shadow-sm text-sm bg-zinc-100 rounded-xl text-black cursor-pointer hover:scale-105 transition-all font-bold px-4 py-2 flex gap-2 items-center flex-row-reverse"
              >
                View Full Screen <FaExpandAlt />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div className="flex">
        {/* Code toggle component - Second */}
        {component.UsageCode &&
          component.DynamicallyCode &&
          component.MainFileCode && (
            <CodeToggle
              usageCode={component.UsageCode}
              dynamicCode={component.DynamicallyCode}
              mainFileCode={component.MainFileCode}
              data={component.DataStructure}
            />
          )}
        <div className="w-1/4">
          {tableOfContents.length > 0 && (
            <div className="sticky top-5 w-full flex flex-col text-right justify-center items-end overflow-y-auto max-h-[90vh] bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <h3 className="text-xl w-min font-semibold mb-4 text-white/70 pl-20 text-right border-b-1 border-white/10 pb-2">
                Topic
              </h3>
              <ul className="w-full flex flex-col gap-2">
                {tableOfContents.map((title, idx) => (
                  <span key={idx}>
                    <a
                      href={`#${title.replace(/\s+/g, "-").toLowerCase()}`}
                      className={`text-right py-1 px-2 w-full rounded transition-colors ${
                        activeSection === title
                          ? "text-white"
                          : "text-gray-300/50 hover:bg-gray-700/50"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(title);
                      }}
                    >
                      {title}
                    </a>
                  </span>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Documentation with sidebar - Third */}
      <div className="flex relative justify-items-stretch mt-10">
        {/* Main content */}
        <ComponentDocumentation
          description={component.description}
          renderFormattedContent={renderFormattedContent}
        />

        {/* Right sidebar - Topic navigation */}
      </div>
    </div>
  );
}

export default Parentmain;

import React, { useRef, useState, useEffect } from "react";
import { js as beautify, html as beautifyHtml } from "js-beautify";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { BiCopy } from "react-icons/bi";

import Button from "./components/Button";
import Card from "./components/Card";
import Modal from "./components/Modal";

const componentMap = {
  Button,
  Card,
  Modal,
};

const FullscreenViewer = ({ component, onClose, code, componentId }) => {
  const CompRef = useRef(null);
  const [CodeRend, setCodeRend] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  const DynamicComponent = componentMap[component];

  useEffect(() => {
    if (CompRef.current) {
      const htmlOutput = beautifyHtml(CompRef.current.innerHTML, {
        indent_size: 3,
        wrap_line_length: 100,
        preserve_newlines: true,
      });
      setCodeRend(htmlOutput);
    }
  }, [component]);

  const handleCopy = () => {
    if (CodeRend) {
      navigator.clipboard.writeText(CodeRend).then(() => {
        alert("Rendered HTML copied to clipboard!");
      });
    }
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match this with your exit animation duration
  };

  if (!DynamicComponent) {
    return <div>Component not found!</div>;
  }

  const beautifiedCode = beautify(code, { indent_size: 2 });

  return (
    <AnimatePresence mode="wait">
      <LayoutGroup>
        <motion.div
          key={component}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3,
          }}
          className="fixed inset-0 z-50 backdrop-blur-md flex flex-col justify-center items-center p-6 overflow-auto"
          layout
        >
          {/* Live Component Preview */}
          <motion.div
            ref={CompRef}
            layout
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 flex justify-center items-center backdrop-blur-xl rounded-xl shadow-lg bg-white/10 mb-6"
          >
            <DynamicComponent component={componentId} />
          </motion.div>

          {/* Code + Data Window */}
          <motion.div
            className="flex justify-center"
            layout
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition shadow-md"
            >
              Close Preview
            </motion.button>
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </AnimatePresence>
  );
};

export default FullscreenViewer;

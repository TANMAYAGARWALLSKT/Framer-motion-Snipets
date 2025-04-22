import React, { useState } from "react";
import { BsCopy, BsCheckLg } from "react-icons/bs";
import { motion } from "framer-motion";

function CodeToggle({ usageCode, dynamicCode, mainFileCode, data }) {
  const [activeTab, setActiveTab] = useState("usage");
  const [copiedTabs, setCopiedTabs] = useState({
    usage: false,
    dynamic: false,
    main: false,
    data: false,
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const copyToClipboard = () => {
    let codeToCopy = "";
    switch (activeTab) {
      case "usage":
        codeToCopy = usageCode;
        break;
      case "dynamic":
        codeToCopy = dynamicCode;
        break;
      case "main":
        codeToCopy = mainFileCode;
        break;
      case "data":
        codeToCopy = mainFileCode;
        break;
      default:
        codeToCopy = "";
    }

    navigator.clipboard.writeText(codeToCopy).then(
      () => {
        // Mark this tab as copied
        setCopiedTabs((prev) => ({
          ...prev,
          [activeTab]: true,
        }));

        // Trigger animation
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
      },
      () => {
        alert("Failed to copy code.");
      }
    );
  };

  const renderCode = () => {
    switch (activeTab) {
      case "usage":
        return (
          <pre className="border CodeScrollbar border-white/20 backdrop-blur-3xl max-h-[100vh] h-min shadow-inner-3xl shadow-white text-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto overflow-y-auto">
            <code>{usageCode}</code>
          </pre>
        );
      case "dynamic":
        return (
          <pre className="border CodeScrollbar border-white/20 backdrop-blur-3xl max-h-[100vh] h-min shadow-inner-3xl shadow-white text-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto overflow-y-auto">
            <code>{dynamicCode}</code>
          </pre>
        );
      case "main":
        return (
          <pre className="border CodeScrollbar border-white/20 backdrop-blur-3xl max-h-[100vh] h-min shadow-inner-3xl shadow-white text-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto overflow-y-auto">
            <code>{mainFileCode}</code>
          </pre>
        );
      case "data":
        return (
          <pre className="border CodeScrollbar border-white/20 backdrop-blur-3xl max-h-[100vh] h-min shadow-inner-3xl shadow-white text-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto overflow-y-auto">
            <code>{data}</code>
          </pre>
        );
      default:
        return null;
    }
  };

  const currentTabCopied = copiedTabs[activeTab];

  return (
    <div className="w-2/3 max-w-4xl mx-auto mt-8 select-none backdrop-blur-3xl shadow-xl shadow-amber-50/10 flex flex-col gap-2 py-4 px-4 rounded-2xl">
      <div className="flex justify-between">
        <div className="flex backdrop-blur-3xl gap-2">
          <button
            className={`px-4 py-2 rounded transition-colors flex items-center gap-2 ${
              activeTab === "main"
                ? "bg-emerald-700 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("main")}
          >
            Main File
            {copiedTabs.main && (
              <span className="text-xs text-emerald-300">
                <BsCheckLg />
              </span>
            )}
          </button>
          <button
            className={`px-4 py-2 rounded transition-colors flex items-center gap-2 ${
              activeTab === "usage"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("usage")}
          >
            Basic Usage
            {copiedTabs.usage && (
              <span className="text-xs text-blue-300">
                <BsCheckLg />
              </span>
            )}
          </button>
          <button
            className={`px-4 py-2 rounded transition-colors flex items-center gap-2 ${
              activeTab === "dynamic"
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("dynamic")}
          >
            Dynamic Updates
            {copiedTabs.dynamic && (
              <span className="text-xs text-red-300">
                <BsCheckLg />
              </span>
            )}
          </button>
          <button
            className={`px-4 py-2 rounded transition-colors flex items-center gap-2 ${
              activeTab === "data"
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("data")}
          >
            Data
            {copiedTabs.data && (
              <span className="text-xs text-red-300">
                <BsCheckLg />
              </span>
            )}
          </button>
        </div>
        <motion.button
          className={`px-4 py-2 rounded transition-colors flex items-center justify-center ${
            currentTabCopied ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"
          } text-gray-200`}
          onClick={copyToClipboard}
          whileTap={{ scale: 0.9 }}
          whileHover={{
            scale: 1.05,
            backgroundColor: currentTabCopied ? "#22c55e" : "#4b5563",
          }}
          initial={{ scale: 1 }}
          animate={{
            rotate: isAnimating ? [0, 15, -15, 0] : 0,
            scale: isAnimating ? [1, 1.2, 1] : 1,
            transition: { duration: 0.5 },
          }}
        >
          {currentTabCopied ? <BsCheckLg /> : <BsCopy />}
        </motion.button>
      </div>
      {renderCode()}
    </div>
  );
}

export default CodeToggle;

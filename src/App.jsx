import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavTitle } from "./LibData.js";
import Parentmain from "./Parentmain.jsx";

function App() {
  const [active, setactive] = useState("Button");
  const [firstLoad, setFirstLoad] = useState(false);

  // Turn off firstLoad after first render
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFirstLoad(true);
    }, 100); // you can tweak this delay
    return () => clearTimeout(timeout);
  }, []);

  // Animation for first load
  const firstLoadVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0 },
  };

  // Regular animation for text changes
  const regularVariants = {
    initial: { opacity: 0, y: 2 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.1 } },
    exit: { opacity: 0, y: -2, transition: { duration: 0.1 } },
  };

  return (
    <div className="w-full text-[#F5F5F5] min-h-screen h-full bg-[#111111] flex">
      {/* Sidebar */}
      <div className="w-[15%] h-screen sticky top-0 left-0 border-r-1 py-5 px-5 shadow-xl shadow-white/20 border-amber-100/10 select-none">
        <div className="Logo font-bold border-b-1 border-amber-50/20 pb-10 text-2xl text-shadow-lg text-shadow-amber-100/10 text-center flex justify-center items-center">
          Some UI Lib
        </div>

        <div className="flex justify-center items-start gap-1 flex-col py-4 font-semibold text-[#f5f5f5a5]">
          <span className="text-[#F5F5F5] text-lg font-bold text-shadow-2xs text-shadow-amber-100/10">
            All Components
          </span>

          <div className="flex flex-col gap-1 justify-center items-start border-l-1 border-white/20 pl-2">
            {NavTitle.map((Item) => (
              <span
                key={Item.title}
                onClick={() => setactive(Item.title)}
                className={`pl-2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                  active === Item.title
                    ? "text-[#F5F5F5] font-bold  border-l-white border-white/5 hover:scale-110 shadow-xl bg-white/5 backdrop-blur-5xl shadow-white/10  overflow-hidden border-l-3 pr-10"
                    : "font-light"
                }`}
              >
                {Item.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10">
        <AnimatePresence mode="wait">
          <motion.h1
            key={active}
            variants={firstLoad ? firstLoadVariants : regularVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-4xl font-bold text-white border-b-1 backdrop-blur-2xl  border-white/20 pb-2"
          >
            {active}
          </motion.h1>
          <Parentmain active={active} />
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;

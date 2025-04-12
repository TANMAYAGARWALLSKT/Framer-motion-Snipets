import React from "react";
import { Location, Projects, Directors } from "../public/Data";
import { delay, motion } from "framer-motion"; // Corrected import - animate is not needed as import

function App() {
  const Data = [
    {
      src: "pic2.jpg",
      delay: "0.3",
      initial: { x: -150, opacity: 0.5 },
      animate: { x: 0, opacity: 1 }, // Fixed animation target
    },
    {
      src: "pic3.jpg",
      delay: "0.4",
      initial: { y: -150, opacity: 0.5 },
      animate: { y: 0, opacity: 1 }, // Added animate property
    },
    {
      src: "pic4.jpg",
      delay: "0.2",
      initial: { x: -150, opacity: 0.5 },
      animate: { x: 0, opacity: 1 }, // Fixed animation target
    },
    {
      src: "pic5.jpg",
      delay: "0.4",
      initial: { y: -150, opacity: 0.5 },
      animate: { y: 0, opacity: 1 }, // Fixed animation target
    },
    {
      src: "pic6.jpg",
      delay: "0.5",
      initial: { x: -150, opacity: 0.5 },
      animate: { x: 0, opacity: 1 }, // Fixed animation target
    },
    {
      src: "pic7.jpg",
      delay: "0.2",
      initial: { y: -150, opacity: 0.5 },
      animate: { y: 0, opacity: 1 }, // Fixed animation target
    },
    {
      src: "pic8.jpg",
      delay: "0.1",
      initial: { x: -150, opacity: 0.5 },
      animate: { x: 0, opacity: 1 }, // Fixed animation target
    },
    {
      src: "pic9.jpg",
      delay: "0.3",
      initial: { y: -150, opacity: 0.5 },
      animate: { y: 0, opacity: 1 }, // Fixed animation target
    },
    {
      src: "pic10.jpg",
      delay: "0.5",
      initial: { x: -150, opacity: 0.5 },
      animate: { x: 0, opacity: 1 }, // Fixed animation target
    },
  ];

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0.5 },
    visible: {
      opacity: 0.7,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  // Item animation
  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        type: "spring",
      },
    },
  };

  // Gallery container animation
  const galleryVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Gallery item animation
  const galleryItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="font-geist bg-neutral-950 text-zinc-100 flex flex-col items-center justify-center w-screen h-screen overflow-hidden select-none">
      <div className="flex flex-col lg:flex-row w-full h-full justify-around items-center text-center px-4">
        {/* Left Column */}
        <div className="w-full lg:w-1/4 h-full text-md font-semibold flex flex-row gap-5 items-center justify-center overflow-y-auto py-5">
          <motion.div
            className="w-full text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="font-bold text-lg opacity-55">Project</div>
            <div className="flex flex-col pt-5">
              {Projects.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="w-full text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="font-bold text-lg opacity-55">
              Directors // Photographers
            </div>
            <div className="flex flex-col pt-5">
              {Directors.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Middle Column - Images */}
        <motion.div
          className="flex flex-wrap gap-4 w-full lg:w-2/5 h-4/5 justify-center items-center py-5 overflow-y-auto"
          variants={galleryVariants}
          initial="hidden"
          animate="visible"
        >
          {Data.map((item, index) => (
            <motion.div
              key={index}
              className="w-1/4 aspect-square overflow-hidden rounded-md"
              // variants={galleryItemVariants}
            >
              <motion.img
                initial={item.initial}
                animate={item.animate}
                transition={{ duration: 0.5, delay: `${item.delay}` }}
                src={`/images/${item.src}`}
                alt={`Project image ${index + 1}`}
                className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Right Column */}
        <div className="w-full lg:w-1/4 h-full text-md font-semibold flex flex-col gap-5 items-start justify-center overflow-y-auto py-5">
          <motion.div
            className="font-bold text-lg opacity-55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Project Locations
          </motion.div>
          <motion.div
            className="flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Location.map((item, index) => (
              <motion.h1 key={index} variants={itemVariants}>
                {item}
              </motion.h1>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;

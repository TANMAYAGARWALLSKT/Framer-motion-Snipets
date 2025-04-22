import React, { useState, useEffect } from "react";
import { ComponetData } from "../LibData";
import { motion, useMotionValue, useTransform } from "framer-motion";

function Card({
  component,
  initialColors = {},
  initialTilt = {},
  initialDepth = {},
}) {
  const defaultColors = {
    primary: "#1E1E1E",
    secondary: "#4CAF50",
    text: "#FFFFFF",
    shadow: "rgba(0, 0, 0, 0.8)",
  };

  const defaultTilt = { x: 5, y: 5 };
  const defaultDepth = { image: 1.2, text: 0.5, card: 0.4 };

  const [colors, setColors] = useState({ ...defaultColors, ...initialColors });
  const [tilt, setTilt] = useState({ ...defaultTilt, ...initialTilt });
  const [depth, setDepth] = useState({ ...defaultDepth, ...initialDepth });
  const [isHovering, setIsHovering] = useState(false);

  const cardData = ComponetData.find((item) => item.Module === component);
  if (!cardData)
    return <div className="text-red-500">Component not found!</div>;
  const { cardData: data } = cardData;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, (v) => `${-v * tilt.y}deg`);
  const rotateY = useTransform(mouseX, (v) => `${v * tilt.x}deg`);

  const depthTransform = (x, y, factor) =>
    `translateX(${x * factor * 2}px) translateY(${y * factor * 2}px)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    mouseX.set(x);
    mouseY.set(y);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  };

  const updateColor = (colorName, newColor) => {
    if (!colors.hasOwnProperty(colorName)) return false;
    setColors((prev) => ({ ...prev, [colorName]: newColor }));
    return true;
  };

  const updateTilt = (axis, degree) => {
    if (!["x", "y"].includes(axis)) return false;
    setTilt((prev) => ({ ...prev, [axis]: Number(degree) }));
    return true;
  };

  const updateDepth = (element, value) => {
    if (!depth.hasOwnProperty(element)) return false;
    setDepth((prev) => ({ ...prev, [element]: Number(value) }));
    return true;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.cardAPI = window.cardAPI || {};
      window.cardAPI[component] = { updateColor, updateTilt, updateDepth };
    }
    return () => {
      if (window.cardAPI) delete window.cardAPI[component];
    };
  }, [component]);

  return (
    <motion.div
      className="w-md rounded-md p-4 min-h-[30%] flex flex-col items-center justify-center bg-opacity-90 transition-all duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        boxShadow: isHovering
          ? `-10px -10px 30px ${colors.shadow}`
          : `-5px -5px 15px ${colors.shadow}`,
        backgroundColor: colors.primary,
      }}
    >
      <motion.div
        className="border border-amber-50/10 p-4 rounded-lg flex flex-col gap-4 items-center relative overflow-hidden"
        style={{
          backgroundColor: colors.primary,
          boxShadow: isHovering
            ? `-10px -10px 30px ${colors.shadow}`
            : `-5px -5px 15px ${colors.shadow}`,
        }}
      >
        <motion.span
          className="overflow-hidden rounded-2xl shadow-xl w-[98%] h-[20rem]"
          style={{
            transform: depthTransform(mouseX.get(), mouseY.get(), depth.image),
          }}
        >
          <img
            className="w-full h-full object-cover"
            src={data.image || "https://via.placeholder.com/400"}
            alt={data.name || "Card image"}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400";
              e.target.alt = "Image failed to load";
            }}
          />
        </motion.span>

        <motion.div
          className="flex flex-col text-left"
          style={{
            transform: depthTransform(mouseX.get(), mouseY.get(), depth.text),
          }}
        >
          <span
            className="font-bold text-3xl"
            style={{ color: colors.secondary }}
          >
            {data.name || "Untitled"}
          </span>
          <span
            className="font-semibold text-md pl-1 opacity-70"
            style={{ color: colors.secondary }}
          >
            {data.title || "No title available"}
          </span>
          <span
            className="font-light text-sm pt-2 pl-2 ml-1 max-w-[94%] max-h-[20vh] overflow-y-auto"
            style={{ color: colors.text }}
          >
            {data.description || "No description available"}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Card;

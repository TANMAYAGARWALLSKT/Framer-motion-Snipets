import React, { useState, useEffect } from "react";
import { ComponetData } from "../LibData";

function Card({
  component,
  initialColors = {},
  initialTilt = {},
  initialDepth = {},
}) {
  // Default values with fallbacks for all customizable properties
  const defaultColors = {
    primary: "#1E1E1E", // Background color
    secondary: "#4CAF50", // Accent color for headings/titles
    text: "#FFFFFF", // Body text color
    shadow: "rgba(0, 0, 0, 0.8)", // Shadow color
  };

  const defaultTilt = {
    x: 5, // X-axis tilt degree
    y: 5, // Y-axis tilt degree
  };

  const defaultDepth = {
    image: 1.2, // Image depth effect
    text: 0.5, // Text depth effect
    card: 0.4, // Overall card depth
  };

  // Initialize state with merged defaults and provided props
  const [colors, setColors] = useState({ ...defaultColors, ...initialColors });
  const [tilt, setTilt] = useState({ ...defaultTilt, ...initialTilt });
  const [depth, setDepth] = useState({ ...defaultDepth, ...initialDepth });
  const [mouseVal, setMouseVal] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Find card data from component prop
  const cardData = ComponetData.find((item) => item.Module === component);

  if (!cardData) {
    return <div className="error-message">Component not found!</div>;
  }

  const { cardData: data } = cardData;

  // Color validation helper function
  const isValidColor = (color) => {
    return (
      /^#([0-9A-F]{3}){1,2}$/i.test(color) || // Hex colors (#FFF or #FFFFFF)
      /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*(?:0?\.)?\d+\s*)?\)$/i.test(
        color
      ) // RGB/RGBA
    );
  };

  // Handle mouse move to create 3D tilt effect based on mouse position
  const handleMouseMove = (e) => {
    if (!e.currentTarget) return;

    const rect = e.currentTarget.getBoundingClientRect();
    // Ensure we have valid dimensions to prevent NaN values
    if (rect.width === 0 || rect.height === 0) return;

    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // range [-1, 1]
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setMouseVal({ x, y });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    // Smoothly reset to neutral position
    setMouseVal({ x: 0, y: 0 });
    setIsHovering(false);
  };

  // Function for applying dynamic 3D tilt based on mouse position
  const depthTransform = (x, y, depthFactor) => {
    const maxTilt = 2;
    return `translateX(${x * depthFactor * maxTilt}px) translateY(${
      y * depthFactor * maxTilt
    }px)`;
  };

  // Dynamic box shadow based on mouse movement
  const dynamicShadow = (x, y) => {
    const maxOffset = 20;
    const offsetX = x * maxOffset;
    const offsetY = y * maxOffset;
    const intensity = isHovering ? 1 : 0.5;

    return `${-offsetX}px ${-offsetY}px ${30 * intensity}px ${colors.shadow}`;
  };

  // Public API for updating colors
  const updateColor = (colorName, newColor) => {
    if (!colors.hasOwnProperty(colorName)) {
      console.error(`Invalid color property: ${colorName}`);
      return false;
    }

    if (!isValidColor(newColor)) {
      console.error(`Invalid color format: ${newColor}`);
      return false;
    }

    setColors((prevColors) => ({
      ...prevColors,
      [colorName]: newColor,
    }));
    return true;
  };

  // Public API for updating tilt effect
  const updateTilt = (axis, degree) => {
    if (axis !== "x" && axis !== "y") {
      console.error(`Invalid tilt axis: ${axis}. Use 'x' or 'y'.`);
      return false;
    }

    // Ensure degree is a number and within reasonable bounds
    const degreeNum = Number(degree);
    if (isNaN(degreeNum) || degreeNum < 0 || degreeNum > 20) {
      console.error("Tilt degree should be a number between 0 and 20.");
      return false;
    }

    setTilt((prevTilt) => ({
      ...prevTilt,
      [axis]: degreeNum,
    }));
    return true;
  };

  // Public API for updating depth effect
  const updateDepth = (element, value) => {
    if (!depth.hasOwnProperty(element)) {
      console.error(`Invalid depth element: ${element}`);
      return false;
    }

    const depthNum = Number(value);
    if (isNaN(depthNum) || depthNum < 0 || depthNum > 3) {
      console.error("Depth value should be a number between 0 and 3.");
      return false;
    }

    setDepth((prevDepth) => ({
      ...prevDepth,
      [element]: depthNum,
    }));
    return true;
  };

  // Make the API methods available to parent components
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Expose the API methods to the component instance
      if (window.cardAPI)
        window.cardAPI[component] = {
          updateColor,
          updateTilt,
          updateDepth,
        };
      else
        window.cardAPI = {
          [component]: { updateColor, updateTilt, updateDepth },
        };
    }

    return () => {
      // Clean up when component unmounts
      if (window.cardAPI && window.cardAPI[component]) {
        delete window.cardAPI[component];
      }
    };
  }, [component]);

  return (
    <div
      className="w-md rounded-md py-3 px-3 min-h-[30%] flex flex-col items-center justify-center transition-all duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${
          mouseVal.y * -tilt.y
        }deg) rotateY(${mouseVal.x * tilt.x}deg)`,
        boxShadow: dynamicShadow(mouseVal.x, mouseVal.y),
        backgroundColor: colors.primary,
        transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
      }}
    >
      <div
        className="border-1 border-amber-50/10 py-4 px-4 flex flex-col rounded-lg pb-5 gap-3 items-center relative overflow-hidden"
        style={{
          transform: `perspective(1000px) rotateX(${
            mouseVal.y * -2
          }deg) rotateY(${mouseVal.x * 2}deg)`,
          boxShadow: dynamicShadow(mouseVal.x, mouseVal.y),
          backgroundColor: colors.primary,
          transition: "all 0.3s ease-out",
        }}
      >
        {/* Image with dynamic depth effect */}
        <span
          className="overflow-hidden rounded-2xl shadow-xl w-[98%] h-[20rem] transition-all duration-300"
          style={{
            transform: depthTransform(mouseVal.x, mouseVal.y, depth.image),
          }}
        >
          <img
            className="aspect-square object-cover overflow-hidden w-full h-full"
            src={data.image || "https://via.placeholder.com/400"}
            alt={data.name || "Card image"}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400";
              e.target.alt = "Image failed to load";
            }}
          />
        </span>

        {/* Text Block with dynamic colors and depth */}
        <div
          className="flex flex-col text-left transition-all duration-300"
          style={{
            transform: depthTransform(mouseVal.x, mouseVal.y, depth.text),
          }}
        >
          <span
            className="font-bold text-3xl text-left"
            style={{ color: colors.secondary }}
          >
            {data.name || "Untitled"}
          </span>
          <span
            className="font-semibold text-md pl-1"
            style={{ color: colors.secondary, opacity: 0.7 }}
          >
            {data.title || "No title available"}
          </span>
          <span
            className="font-light text-sm pt-2 pl-2 ml-1 max-w-[94%] max-h-[20vh] overflow-y-auto scroll-auto  rounded inset-shadow-zinc-950 inset-shadow-sm "
            style={{
              color: colors.text,
              opacity: 0.9,
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE and Edge
            }}
          >
            {data.description || "No description available"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;

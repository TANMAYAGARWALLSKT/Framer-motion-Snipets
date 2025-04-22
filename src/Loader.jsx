import React, { useRef } from "react";
import { Data } from "./Data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Loader() {
  const ImgRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(ImgRef, {
      rotate: 320,
    });
  });
  return (
    <div className="grid grid-cols-3 gap-5 w-[30vw] mx-auto">
      {Data.map((item, index) => (
        <div key={index} className="aspect-square w-full">
          <img
            ref={ImgRef}
            className="w-full h-full object-cover shadow-2xl shadow-white/10 "
            src={`images/${item.src}`}
            alt={`image-${index}`}
          />
        </div>
      ))}
    </div>
  );
}

export default Loader;

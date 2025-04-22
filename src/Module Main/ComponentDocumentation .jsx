import React from "react";

const ComponentDocumentation = ({ description, renderFormattedContent }) => {
  return (
    <div className="md:w-3/4">
      <div className="mb-8 overflow-x-hidden max-w-4xl">
        {description?.map((desc, idx) => {
          switch (desc.type) {
            case "h2":
              return (
                <h2
                  key={idx}
                  className="text-4xl font-bold mt-6 mb-3 text-shadow-md text-shadow-amber-50/20 text-white pb-2"
                >
                  {desc.content}
                </h2>
              );
            case "h3":
              return (
                <h3
                  id={desc.content.replace(/\s+/g, "-").toLowerCase()}
                  key={idx}
                  className="text-3xl font-semibold mt-8 mb-3 text-white scroll-mt-20"
                >
                  {desc.content}
                </h3>
              );
            case "p":
              return (
                <p key={idx} className="mb-3 leading-relaxed text-gray-300">
                  {renderFormattedContent(desc.content)}
                </p>
              );
            case "li":
              return (
                <li key={idx} className="ml-6 list-disc mb-1 text-gray-300">
                  <span dangerouslySetInnerHTML={{ __html: desc.content }} />
                </li>
              );
            case "code":
              return (
                <pre
                  key={idx}
                  className="bg-gray-800 p-3 rounded-md text-sm font-mono my-3 overflow-x-auto text-gray-200"
                >
                  <code>{desc.content}</code>
                </pre>
              );
            default:
              return (
                <p key={idx} className="mb-3 leading-relaxed text-gray-300">
                  {renderFormattedContent(desc.content)}
                </p>
              );
          }
        })}
      </div>
    </div>
  );
};

export default ComponentDocumentation;

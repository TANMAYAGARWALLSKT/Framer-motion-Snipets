export const NavTitle = [
  { id: "button", title: "Button", alt: "Clickable button" },
  { id: "card", title: "Card", alt: "Content container with shadow" },
  { id: "modal", title: "Modal", alt: "Popup dialog window" },
  { id: "tooltip", title: "Tooltip", alt: "Hover info box" },
  { id: "dropdown", title: "Dropdown", alt: "Select from a list" },
  { id: "input", title: "Input", alt: "Text input field" },
  { id: "select", title: "Select", alt: "Custom select menu" },
  { id: "checkbox", title: "Checkbox", alt: "Toggle check option" },
  { id: "radio", title: "Radio", alt: "Select one from many" },
  { id: "switch", title: "Switch", alt: "Toggle between states" },
  { id: "avatar", title: "Avatar", alt: "User profile image" },
  { id: "badge", title: "Badge", alt: "Small status indicator" },
  { id: "table", title: "Table", alt: "Tabular data display" },
  { id: "tabs", title: "Tabs", alt: "Switch between views" },
  { id: "alert", title: "Alert", alt: "Notification banner" },
  { id: "accordion", title: "Accordion", alt: "Expandable sections" },
  { id: "breadcrumbs", title: "Breadcrumbs", alt: "Navigation trail" },
  { id: "progress", title: "Progress", alt: "Progress indicator" },
  { id: "spinner", title: "Spinner", alt: "Loading indicator" },
  { id: "toast", title: "Toast", alt: "Temporary notification" },
];
export const ComponentDocs = [
  {
    id: "button",
    title: "Button",
    description: [
      { type: "h2", content: "Button" },
      {
        type: "p",
        content:
          "Buttons are clickable elements used to perform actions such as submitting a form or triggering a modal.",
      },
      {
        type: "p",
        content:
          "They support different styles like primary, secondary, and ghost to convey importance.",
      },
      { type: "p", content: "Common props:" },
      { type: "li", content: "`onClick`: handles click events" },
      { type: "li", content: "`variant`: style variant" },
      { type: "li", content: "`disabled`: disables the button" },
    ],
    code: `<Button>Click me</Button>`,
  },
  {
    id: "card",
    title: "Card",
    description: [
      { type: "h2", content: "Dynamic 3D Card" },
      {
        type: "p",
        content:
          "An interactive card component with 3D tilt effects, customizable colors, and depth transformations that respond to mouse movement.",
      },
      {
        type: "h3",
        content: "How To Use ?",
      },
      {
        type: "p",
        content:
          "3D tilt effect that responds to mouse position\n-  Dynamic depth transformations for layered elements\n-  Customizable colors for background, text, accents, and shadows\n-  Adjustable tilt sensitivity and depth effects\n-  Robust error handling and fallbacks",
      },
      {
        type: "h3",
        content: "Props",
      },
      {
        type: "p",
        content:
          "Component (required): String identifier to fetch data\n-  initialColors: Object with color settings\n-  initialTilt: Object with tilt sensitivity values\n-  initialDepth: Object with depth effect settings",
      },
      {
        type: "h3",
        content: "API Methods",
      },
      {
        type: "p",
        content:
          "updateColor(colorName, newColor): Updates specific color property\n-  updateTilt(axis, degree): Adjusts tilt sensitivity\n-  updateDepth(element, value): Changes depth effect for specific elements",
      },
      {
        type: "h3",
        content: "Default Values",
      },
      {
        type: "p",
        content:
          "Colors: Primary :(#1E1E1E) \n- Secondary : (#4CAF50) \n- Text : (#FFFFFF) \n- Shadow : (rgba(0,0,0,0.3)) \n- Tilt : x (5), y (5) \n- Depth: image (1.2) \n- Text : (0.5)\n- Card : (0.4)",
      },
      {
        type: "h3",
        content: "Data Structure",
      },
      {
        type: "p",
        content:
          "The component expects data in the ComponetData array with the following structure:\n-  Module: Component identifier\n-  cardData: Object containing image, name, title, and description",
      },
    ],
    UsageCode: `
  // Basic usage
<Card component="Button" />

// With custom initial values
<Card 
  component="Button" 
  initialColors={{
    primary: "#2D2D2D",
    secondary: "#FF5722",
    text: "#F5F5F5",
    shadow: "rgba(255, 87, 34, 0.3)"
  }}
  initialTilt={{
    x: 8,
    y: 3
  }}
  initialDepth={{
    image: 1.5,
    text: 0.7,
    card: 0.5
  }}
/>`,
    DynamicallyCode: `useEffect(() => {
  // After component mounts
  if (window.cardAPI && window.cardAPI.Button) {
    // Change colors
    window.cardAPI.Button.updateColor('primary', '#121212');
    window.cardAPI.Button.updateColor('secondary', '#4CAF50');
    
    // Change tilt effect
    window.cardAPI.Button.updateTilt('x', 10);
    
    // Change depth effect
    window.cardAPI.Button.updateDepth('image', 2.0);
  }
}, []);`,
    MainFileCode: `import React, { useState, useEffect } from "react";
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
      /^rgba?\\(\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*\\d+\\s*(?:,\\s*(?:0?\\.)?\\d+\\s*)?\\)$/i.test(
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
    return \`translateX(\${x * depthFactor * maxTilt}px) translateY(\${
      y * depthFactor * maxTilt
    }px)\`;
  };

  // Dynamic box shadow based on mouse movement
  const dynamicShadow = (x, y) => {
    const maxOffset = 20;
    const offsetX = x * maxOffset;
    const offsetY = y * maxOffset;
    const intensity = isHovering ? 1 : 0.5;

    return \`\${-offsetX}px \${-offsetY}px \${30 * intensity}px \${colors.shadow}\`;
  };

  // Public API for updating colors
  const updateColor = (colorName, newColor) => {
    if (!colors.hasOwnProperty(colorName)) {
      console.error(\`Invalid color property: \${colorName}\`);
      return false;
    }

    if (!isValidColor(newColor)) {
      console.error(\`Invalid color format: \${newColor}\`);
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
      console.error(\`Invalid tilt axis: \${axis}. Use 'x' or 'y'.\`);
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
      console.error(\`Invalid depth element: \${element}\`);
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
        transform: \`perspective(1000px) rotateX(${
          mouseVal.y * -tilt.y
        }deg) rotateY(${mouseVal.x * tilt.x}deg)\`,
        boxShadow: dynamicShadow(mouseVal.x, mouseVal.y),
        backgroundColor: colors.primary,
        transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
      }}
    >
      <div
        className="border-1 border-amber-50/10 py-4 px-4 flex flex-col rounded-lg pb-5 gap-3 items-center relative overflow-hidden"
        style={{
          transform: \`perspective(1000px) rotateX(${
            mouseVal.y * -2
          }deg) rotateY(${mouseVal.x * 2}deg)\`,
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

export default Card;`,

    DataStructure: ` //LibData.js
    export const ComponetData = [
  {
    Module: "card",
    cardData: {
      name: "Tanmay Agarwal",
      title: "Front-End Developer",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ...",
      image: "../images/pic1.avif",
    },
  },
];
`,
  },

  {
    id: "modal",
    title: "Modal",
    description: [
      { type: "h2", content: "Modal" },
      {
        type: "p",
        content:
          "Modals are dialog boxes that appear over the main content to capture user attention.",
      },
      {
        type: "p",
        content: "They're ideal for confirmations, forms, or detailed content.",
      },
      { type: "p", content: "Props include:" },
      { type: "li", content: "`isOpen`: visibility toggle" },
      { type: "li", content: "`onClose`: dismiss handler" },
    ],
    code: `<Modal isOpen={true} onClose={handleClose}>Modal Content</Modal>`,
  },
  {
    id: "tooltip",
    title: "Tooltip",
    description: [
      { type: "h2", content: "Tooltip" },
      {
        type: "p",
        content:
          "Tooltips display brief information when a user hovers or focuses on an element.",
      },
      {
        type: "p",
        content: "They're perfect for clarifying icons or short labels.",
      },
      { type: "p", content: "Use sparingly and ensure text is concise." },
      { type: "p", content: "Props:" },
      { type: "li", content: "`content`: tooltip text" },
    ],
    code: `<Tooltip content="More info"><Button>Hover me</Button></Tooltip>`,
  },
  {
    id: "dropdown",
    title: "Dropdown",
    description: [
      { type: "h2", content: "Dropdown" },
      {
        type: "p",
        content:
          "Dropdowns let users choose one option from a list. They're ideal for compact forms or actions with multiple paths.",
      },
      { type: "p", content: "Ensure options are clear and grouped logically." },
      { type: "p", content: "Props:" },
      { type: "li", content: "`options`: array of items" },
      { type: "li", content: "`onSelect`: callback when an item is picked" },
    ],
    code: `<Dropdown options={['Option 1', 'Option 2']} onSelect={handleSelect} />`,
  },
  {
    id: "input",
    title: "Input",
    description: [
      { type: "h2", content: "Input" },
      {
        type: "p",
        content:
          "Input fields allow users to enter text data. They're used in forms, search bars, and filters.",
      },
      {
        type: "p",
        content: "Use appropriate types and labels for accessibility.",
      },
      { type: "p", content: "Props:" },
      { type: "li", content: "`value`, `onChange`" },
      { type: "li", content: "`placeholder`" },
    ],
    code: `<Input placeholder="Type something..." />`,
  },
  {
    id: "select",
    title: "Select",
    description: [
      { type: "h2", content: "Select" },
      {
        type: "p",
        content:
          "The Select component is a styled version of a native select menu. Great for picking one option from many.",
      },
      { type: "p", content: "Can support custom rendering and search." },
      { type: "p", content: "Props:" },
      { type: "li", content: "`options`" },
      { type: "li", content: "`onChange`" },
    ],
    code: `<Select options={['One', 'Two']} />`,
  },
  {
    id: "checkbox",
    title: "Checkbox",
    description: [
      { type: "h2", content: "Checkbox" },
      {
        type: "p",
        content:
          "Checkboxes let users toggle an on/off state. Often used in settings or forms with multiple options.",
      },
      { type: "p", content: "Props:" },
      { type: "li", content: "`checked`" },
      { type: "li", content: "`onChange`" },
      { type: "li", content: "`label`" },
    ],
    code: `<Checkbox label="I agree" />`,
  },
  {
    id: "radio",
    title: "Radio",
    description: [
      { type: "h2", content: "Radio" },
      {
        type: "p",
        content:
          "Radio buttons allow users to select one option from a group. Unlike checkboxes, only one can be active at a time.",
      },
      { type: "p", content: "Use for mutually exclusive choices." },
      { type: "p", content: "Props:" },
      { type: "li", content: "`options`" },
      { type: "li", content: "`value`, `onChange`" },
    ],
    code: `<RadioGroup options={['A', 'B']} />`,
  },
  {
    id: "switch",
    title: "Switch",
    description: [
      { type: "h2", content: "Switch" },
      {
        type: "p",
        content:
          'Switches represent a binary option, typically toggling between "on" and "off" states. They\'re often used in settings panels.',
      },
      { type: "p", content: "Props:" },
      { type: "li", content: "`checked`" },
      { type: "li", content: "`onChange`" },
    ],
    code: `<Switch checked={true} onChange={toggle} />`,
  },
  {
    id: "avatar",
    title: "Avatar",
    description: [
      { type: "h2", content: "Avatar" },
      {
        type: "p",
        content:
          "Avatars show user profile images or initials. Useful for accounts, comments, and messaging UIs.",
      },
      { type: "p", content: "Props:" },
      { type: "li", content: "`src`" },
      { type: "li", content: "`alt`" },
      { type: "li", content: "`size`" },
    ],
    code: `<Avatar src="profile.jpg" alt="User" />`,
  },
  {
    id: "badge",
    title: "Badge",
    description: [
      { type: "h2", content: "Badge" },
      {
        type: "p",
        content:
          "Badges are small indicators used to display statuses or counts (e.g., unread messages).",
      },
      {
        type: "p",
        content: "They can be styled by type: success, warning, etc.",
      },
      { type: "p", content: "Props:" },
      { type: "li", content: "`variant`" },
      { type: "li", content: "`children` (text or icon)" },
    ],
    code: `<Badge variant="success">Active</Badge>`,
  },
  {
    id: "table",
    title: "Table",
    description: [
      { type: "h2", content: "Table" },
      {
        type: "p",
        content:
          "Tables organize and display data in rows and columns. Ideal for admin panels, dashboards, and analytics.",
      },
      { type: "p", content: "Props:" },
      { type: "li", content: "`data`" },
      { type: "li", content: "`columns`" },
      { type: "li", content: "Optional: pagination, sorting" },
    ],
    code: `<Table data={data} columns={columns} />`,
  },
  {
    id: "tabs",
    title: "Tabs",
    description: [
      { type: "h2", content: "Tabs" },
      {
        type: "p",
        content:
          "Tabs allow users to switch between different views or panels without leaving the page. Use for organized content.",
      },
      { type: "p", content: "Props:" },
      { type: "li", content: "`tabs`" },
      { type: "li", content: "`onChange`" },
      { type: "li", content: "`activeTab`" },
    ],
    code: `<Tabs tabs={['Tab 1', 'Tab 2']} />`,
  },
  {
    id: "alert",
    title: "Alert",
    description: [
      { type: "h2", content: "Alert" },
      {
        type: "p",
        content:
          "Alerts are banners used to show critical messages like errors or warnings.",
      },
      { type: "p", content: "They can include actions like dismiss or retry." },
      { type: "p", content: "Props:" },
      { type: "li", content: "`type`: success, warning, error" },
      { type: "li", content: "`children`: message content" },
    ],
    code: `<Alert type="warning">This is a warning!</Alert>`,
  },
  {
    id: "accordion",
    title: "Accordion",
    description: [
      { type: "h2", content: "Accordion" },
      {
        type: "p",
        content:
          "Accordions allow you to show/hide sections of related content. Great for FAQs or compact layouts.",
      },
      { type: "p", content: "Props:" },
      { type: "li", content: "`items`" },
      { type: "li", content: "`openIndex`, `onToggle`" },
    ],
    code: `<Accordion items={accordionItems} />`,
  },
  {
    id: "breadcrumbs",
    title: "Breadcrumbs",
    description: [
      { type: "h2", content: "Breadcrumbs" },
      {
        type: "p",
        content:
          "Breadcrumbs help users navigate back through the hierarchy of a site. They improve UX for deep pages.",
      },
      { type: "p", content: "Props:" },
      { type: "li", content: "`paths`: array of strings or links" },
    ],
    code: `<Breadcrumbs paths={['Home', 'Library', 'Book']} />`,
  },
  {
    id: "progress",
    title: "Progress",
    description: [
      { type: "h2", content: "Progress" },
      {
        type: "p",
        content:
          "Progress bars indicate the completion status of a task. Can be determinate or indeterminate.",
      },
      { type: "p", content: "Props:" },
      { type: "li", content: "`value` (0–100)" },
      { type: "li", content: "`label` or inline status" },
    ],
    code: `<Progress value={70} />`,
  },
  {
    id: "spinner",
    title: "Spinner",
    description: [
      { type: "h2", content: "Spinner" },
      {
        type: "p",
        content:
          "Spinners show a loading state. Use when waiting for asynchronous operations like fetching data.",
      },
      { type: "p", content: "Props:" },
      { type: "li", content: "`size`" },
      { type: "li", content: "`color` (optional theme-based)" },
    ],
    code: `<Spinner />`,
  },
  {
    id: "toast",
    title: "Toast",
    description: [
      { type: "h2", content: "Toast" },
      {
        type: "p",
        content:
          "Toasts are temporary notifications used to display brief messages like confirmations or errors.",
      },
      { type: "p", content: "They usually auto-dismiss and can be stacked." },
      { type: "p", content: "API:" },
      { type: "li", content: "`toast.success(message)`" },
      { type: "li", content: "`toast.error(message)`" },
    ],
    code: `toast.success("Saved successfully!")`,
  },
];

export const ComponetData = [
  {
    Module: "card",
    cardData: {
      name: "Tanmay Agarwal",
      title: "Front-End Developer",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam at
    excepturi ex nam laboriosam esse dolore praesentium corporis neque
    quo et in, laudantium fuga? Et beatae distinctio dolorum at dolorem.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam at
    excepturi ex nam laboriosam esse dolore praesentium corporis neque
    quo et in, laudantium fuga? Et beatae distinctio dolorum at dolorem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam at
    excepturi ex nam laboriosam esse dolore praesentium corporis neque
    quo et in, laudantium fuga? Et beatae distinctio dolorum at dolorem.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam at
    excepturi ex nam laboriosam esse dolore praesentium corporis neque
    quo et in, laudantium fuga?`,
      image: "../images/pic1.avif",
    },
  },
];

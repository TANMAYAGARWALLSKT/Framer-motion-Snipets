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
  if (!cardData) return <div className="text-red-500">Component not found!</div>;
  const { cardData: data } = cardData;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, (v) => \`\${-v * tilt.y}deg\`);
  const rotateY = useTransform(mouseX, (v) => \`\${v * tilt.x}deg\`);

  const depthTransform = (x, y, factor) =>
    \`translateX(\${x * factor * 2}px) translateY(\${y * factor * 2}px)\`;

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
          ? \`-10px -10px 30px \${colors.shadow}\`
          : \`-5px -5px 15px \${colors.shadow}\`,
        backgroundColor: colors.primary,
      }}
    >
      <motion.div
        className="border border-amber-50/10 p-4 rounded-lg flex flex-col gap-4 items-center relative overflow-hidden"
        style={{
          backgroundColor: colors.primary,
          boxShadow: isHovering
            ? \`-10px -10px 30px \${colors.shadow}\`
            : \`-5px -5px 15px \${colors.shadow}\`,
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
          <span className="font-bold text-3xl" style={{ color: colors.secondary }}>
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

export default Card;`,

    DataStructure: `//LibData.js
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
];`,
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

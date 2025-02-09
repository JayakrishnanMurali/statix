export const components = {
  text: {
    type: "text",
    label: "Text",
    defaultConfig: {
      content: "Enter text here",
      style: {
        fontSize: "16px",
        color: "#000000",
      },
    },
  },
  image: {
    type: "image",
    label: "Image",
    defaultConfig: {
      src: "",
      alt: "",
      style: {
        width: "100%",
        height: "auto",
      },
    },
  },
  button: {
    type: "button",
    label: "Button",
    defaultConfig: {
      content: "Click me",
      style: {
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "8px 16px",
        borderRadius: "4px",
      },
    },
  },
};

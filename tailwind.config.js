import flowbite from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        utama: "url('/images/bg-utama.jpg')",
        main: "url('/images/bg-utama-2.jpg')",
      },
    },
  },
  plugins: [flowbite],
};

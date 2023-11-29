import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "react-material-you-theme",
      fileName: (format) => `react-material-you-theme.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["@mui/material"],
    },
  },
  plugins: [dts()],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import path from "node:path";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true
    }),
    tsconfigPaths()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      formats: ["es", "cjs"],
      fileName: format => `index.${format}.js`,
      name: "snowbeam-workflow-editor"
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    },
    emptyOutDir: true,
    sourcemap: false,
    copyPublicDir: false
  },
  css: {
    postcss: {
      plugins: [tailwindcss]
    }
  }
});

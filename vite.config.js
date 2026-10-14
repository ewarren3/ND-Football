
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// Vite configuration
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Points @ to the src folder
      "@": fileURLToPath(new URL("./src", import.meta.url)),

      // Points to the Parse library
      parse: fileURLToPath(
        new URL("./node_modules/parse/dist/parse.min.js", import.meta.url)
      ),
    },
  },
});

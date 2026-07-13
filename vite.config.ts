import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "force-exit-after-build",
      apply: "build",
      closeBundle() {
        // @ts-ignore
        console.log("Build finished, forcing exit...");
        // @ts-ignore
        setTimeout(() => process.exit(0), 100);
      },
    },
  ],
});

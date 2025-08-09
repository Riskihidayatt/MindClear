import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    server: {
      port: 3000,
      host: true,
      open: true,
    },
    define: {
      "process.env": {},
      // Make env variables available during build (optional fallback)
      __VITE_GEMINI_API_KEY__: JSON.stringify(env.VITE_GEMINI_API_KEY || ''),
      __VITE_APP_NAME__: JSON.stringify(env.VITE_APP_NAME || 'MindClear+'),
    },
    build: {
      outDir: "dist",
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            ai: ["@google/generative-ai"],
          },
        },
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom", "@google/generative-ai"],
    },
  };
});

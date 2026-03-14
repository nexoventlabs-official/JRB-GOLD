import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// JRB Gold - Development server configuration for port 8082
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8082,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __APP_NAME__: '"JRB Gold Private Limited"',
    __APP_DESCRIPTION__: '"Premium Gold & Silver Jewelry"',
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.8082.html')
      }
    }
  }
}));

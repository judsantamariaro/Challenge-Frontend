import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
/// <reference types="vitest" />
/// <reference types="Vite/client" />

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});

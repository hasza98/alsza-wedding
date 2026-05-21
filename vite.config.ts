import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  if (mode !== "production") {
    Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  }

  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  };
});

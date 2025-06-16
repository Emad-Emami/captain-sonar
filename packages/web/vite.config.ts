import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  envPrefix: process.env.PUBLIC_ENV_PREFIX,
  envDir: "./",
  plugins: [reactRouter(), tsconfigPaths()]
});

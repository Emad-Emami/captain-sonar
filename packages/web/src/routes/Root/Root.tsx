import { ThemeProvider } from "@CS/web/components/Providers/components/ThemeProvider";
import { Outlet } from "react-router";

export default function Root() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}

import Providers from "@CS/web/components/Providers";
import { Outlet } from "react-router";

export default function Root() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  );
}

import { useAuth0 } from "@auth0/auth0-react";
import type { PrivateRouteProps } from "@CS/web/components/PrivateRoute/PrivateRoute.types";
import { useEffect } from "react";

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth0();
  useEffect(() => {
    if (!isAuthenticated) {
      throw new Error("User is not authenticated");
      // You can redirect to a login page or show a message here
    }
  }, [isAuthenticated]);
  return isAuthenticated ? <>{children}</> : null;
}

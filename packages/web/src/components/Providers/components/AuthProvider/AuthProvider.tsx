import React from "react";
import { useLocation } from "react-router";
import { Auth0Provider } from "@auth0/auth0-react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <Auth0Provider
      domain={import.meta.env.PUBLIC__AUTH0_DOMAIN || ""}
      clientId={import.meta.env.PUBLIC__AUTH0_CLIENT_ID || ""}
      authorizationParams={{
        redirect_uri: location?.pathname + location?.search
      }}
    >
      {children}
    </Auth0Provider>
  );
}

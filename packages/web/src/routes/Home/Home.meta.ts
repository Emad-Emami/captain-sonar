import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Captain Sonar" }, { name: "description", content: "Welcome to Captain Sonar!" }];
}

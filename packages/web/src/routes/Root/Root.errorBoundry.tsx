import { isRouteErrorResponse } from "react-router";
import { Button, Code, Container, Group, Title } from "@mantine/core";
import classes from "@CS/web/routes/Root/Root.errorBoundry.module.css";
import type { Route } from "../../+types/root";

export function RootErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className={classes.root}>
      <Container>
        <div className={classes.label}>{message}</div>
        <Title className={classes.title}>{details}</Title>
        <Code ta="center" className={classes.description}>
          {stack}
        </Code>
        <Group justify="center">
          <Button variant="white" size="md">
            Refresh the page
          </Button>
        </Group>
      </Container>
    </main>
  );
}

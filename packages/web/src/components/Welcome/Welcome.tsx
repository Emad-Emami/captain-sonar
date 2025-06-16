import { Title, Text, Container, Button } from "@mantine/core";
import classes from "@CS/web/components/Welcome/Welcome.module.css";
import { useAuth0 } from "@auth0/auth0-react";

export function Welcome() {
  const { loginWithRedirect } = useAuth0();

  function handleLogin() {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    });
  }

  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              An{" "}
              <Text component="span" inherit variant="gradient" gradient={{ from: "blue", to: "cyan" }}>
                online submarine
              </Text>{" "}
              game peer to peer or multiplyer
            </Title>

            <Text className={classes.description} mt={30}>
              This is a simple online submarine game that can be played in peer-to-peer mode or multiplayer mode. The game is designed to be
              easy to use and understand, making it accessible to players of all ages and skill levels.
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: "cyan", to: "blue" }}
              size="xl"
              className={classes.control}
              mt={40}
              onClick={handleLogin}
            >
              Get started
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

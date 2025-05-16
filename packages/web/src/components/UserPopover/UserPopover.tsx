import React from "react";
import { ActionIcon, Avatar, Menu } from "@mantine/core";
import { useSession } from "next-auth/react";
import { USER_ANONYMOUS_NAME } from "@CS/web/src/components/UserPopover/UserPopover.constants";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

export function UserPopover() {
  const session = useSession();
  const user = session.data?.user;

  if (!user) {
    return null;
  }

  const { image, name } = user;
  const handleClickSignOut = () => {
    signOut();
  };
  return (
    <Menu>
      <Menu.Target>
        <Avatar component={ActionIcon} size="sm" name={name || USER_ANONYMOUS_NAME} src={image} color="initials" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item disabled={true} leftSection={<IconSettings />}>
          Settings
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item onClick={handleClickSignOut} leftSection={<IconLogout />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

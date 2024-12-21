import { useState } from "react";
import MemberList from "./MemberList";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack, Drawer, Button, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

export default function TemporaryDrawer() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Stack spacing={3} direction="row">
      <Button variant="outlined" color="primary" onClick={toggleDrawer(true)}>
        <MenuIcon />
        <Typography>Members</Typography>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <MemberList />
      </Drawer>
    </Stack>
  );
}

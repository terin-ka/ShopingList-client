import { useState } from "react";
import MemberList from "./MemberList";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack, Drawer, Button } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Stack spacing={3} direction="row">
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ color: theme.palette.secondary.light }}/>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <MemberList />
      </Drawer>
    </Stack>
  );
}

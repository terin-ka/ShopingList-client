import { useContext } from "react";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { Stack, Button, Switch } from "@mui/material";
import AddItemButton from "./AddItemButton";

export default function Toolbar() {
  const { showUnresolvedItems, setShowUnresolvedItems } = useContext(ListOverviewContext);

  const handleChange = () => {
    setShowUnresolvedItems(!showUnresolvedItems);
  };

  return (
    <Stack spacing={2} direction="row">
      <AddItemButton />
      <Stack spacing={2} direction="row">
        <Button variant="outlined">
          {showUnresolvedItems ? "Unfinished" : "All"}
          <Switch checked={showUnresolvedItems} onChange={handleChange} />
        </Button>
      </Stack>
    </Stack>
  );
}

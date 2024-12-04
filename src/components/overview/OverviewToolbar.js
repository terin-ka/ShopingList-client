import AddListButton from "./AddListButton";
import { useContext } from "react";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { Switch, Button, Stack } from "@mui/material";

export default function OverviewToolbar() {
  const { showArchived, toggleShowArchived } = useContext(ListOverviewContext);

  return (
    <Stack spacing={2} direction="row" sx={{ margin: "20px" }}>
      <AddListButton />
      <Stack spacing={2} direction="row">
        <Button variant="outlined">
          {showArchived ? "Archived" : "All"}
          <Switch
            checked={showArchived}
            onChange={() => toggleShowArchived()}
          />
        </Button>
      </Stack>
    </Stack>
  );
}

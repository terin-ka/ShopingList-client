import AddListButton from "./AddListButton";
import { useContext } from "react";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { Switch, Button, Stack } from "@mui/material";
import { useTranslation } from 'react-i18next';

export default function OverviewToolbar() {
  const { t } = useTranslation();
  const { showArchived, toggleShowArchived } = useContext(ListOverviewContext);
  
  return (
    <Stack spacing={2} direction="row" sx={{ margin: "20px" }}>
      <AddListButton />
      <Stack spacing={2} direction="row">
        <Button variant="outlined">
          {showArchived ? t('overview.archivedLists') : t('overview.allLists')}
          <Switch
            checked={showArchived}
            onChange={() => toggleShowArchived()}
          />
        </Button>
      </Stack>
    </Stack>
  );
}

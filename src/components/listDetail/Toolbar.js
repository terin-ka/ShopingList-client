import { useContext } from "react";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { Stack, Button, Switch } from "@mui/material";
import AddItemButton from "./AddItemButton";
import { useTranslation } from 'react-i18next';

export default function Toolbar() {
  const { t } = useTranslation();
  const { showUnresolvedItems, setShowUnresolvedItems } = useContext(ListOverviewContext);

  const handleChange = () => {
    setShowUnresolvedItems(!showUnresolvedItems);
  };

  return (
    <Stack spacing={2} direction="row">
      <AddItemButton />
      <Stack spacing={2} direction="row">
        <Button variant="outlined">
          {showUnresolvedItems ? t('detail.unfinished') : t('detail.all')}
          <Switch checked={showUnresolvedItems} onChange={handleChange} />
        </Button>
      </Stack>
    </Stack>
  );
}

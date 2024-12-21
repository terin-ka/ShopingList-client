import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { UserContext } from "../../contexts/userProvider";
import { useContext } from "react";
import { Stack, Grid2, Typography, CircularProgress } from "@mui/material";
import OverviewToolbar from "./OverviewToolbar";
import ShoppingList from "./ShoppingList";
import { useTranslation } from 'react-i18next';

export default function Overview() {
  const { t } = useTranslation();
  const { overviewData, isLoading } = useContext(ListOverviewContext);
  const { loggedInUser } = useContext(UserContext);

  if (isLoading) return <CircularProgress />;;

  if (!loggedInUser || !overviewData)
    return <Grid2 container justifyContent="center">
      <Typography variant="h2">{t('overview.login')}</Typography>
    </Grid2>;

  return (
    <Stack direction="column" alignItems="center">
      <OverviewToolbar />
      <Grid2 container spacing={4} justifyContent="center">
        {overviewData.map((list) => (
          <ShoppingList key={list._id} list={list} />
        ))}
      </Grid2>
    </Stack>
  );
}

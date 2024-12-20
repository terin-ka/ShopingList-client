import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { UserContext } from "../../contexts/userProvider";
import { useContext } from "react";
import { Stack, Grid2, Typography, Button } from "@mui/material";
import OverviewToolbar from "./OverviewToolbar";
import ShoppingList from "./ShoppingList";

export default function Overview() {
  const { overviewData, isLoading, isError } = useContext(ListOverviewContext);
  const { loggedInUser } = useContext(UserContext);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading lists.</p>;

  if (!loggedInUser || !overviewData)
    return <Grid2 container justifyContent="center">
      <Typography variant="h2">Nejprve se prosím přihlaste</Typography>
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

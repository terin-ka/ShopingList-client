import { useParams } from "react-router-dom";
import { useListData } from "../../hooks/list.hooks";
import { useContext } from "react";
import { UserContext } from "../../contexts/userProviderSimple";
import { ListDetailContext } from "../../contexts/listDetail.provider";
import ItemList from "./ItemList";
import MemberList from "./MemberList";
import { Stack, CircularProgress, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";

export default function ListDetail() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { listId } = useParams();

  const { setlistDetailData } = useContext(ListDetailContext);
  const { loggedInUser } = useContext(UserContext);
  const { data: listData, isLoading, isError} = useListData(loggedInUser?._id, listId);
  

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography color="error">Chyba při načítání seznamu.</Typography>;
  }


  const isMember =
    listData.memberList.includes(loggedInUser?._id) ||
    loggedInUser?._id === listData.owner;

  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={10}
      sx={{
        opacity: isMember ? 1 : 0.5,
        pointerEvents: isMember ? "auto" : "none",
      }}
    >
      {!isSmallScreen && <MemberList />}
      <ItemList />
    </Stack>
  );
}

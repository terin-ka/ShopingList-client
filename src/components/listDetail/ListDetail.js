import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userProviderSimple";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import ItemList from "./ItemList";
import MemberList from "./MemberList";
import Toolbar from "./Toolbar";
import ListName from "./ListName";
import Item from "./Item";
import { Stack, CircularProgress, Typography, List } from "@mui/material";
import TemporaryDrawer from "./TemporaryDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ListDetail() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { listId } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const { setActiveDetail, listDetailData, DetailIsLoading, DetailIsError } = useContext(ListOverviewContext);
  
  useEffect(() => {
    if (listId) {
      localStorage.setItem("activeDetail", listId);
      setActiveDetail(listId);
    }
  }, [listId, setActiveDetail]);

  if (DetailIsLoading) {
    return <CircularProgress />;
  }
  if (DetailIsError) {
    return <Typography color="error">Chyba při načítání seznamu.</Typography>;
  }

  const isMember =
    listDetailData.memberList.includes(loggedInUser?._id) ||
    loggedInUser?._id === listDetailData.owner;

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
      <Stack
      spacing={2}
      direction="column"
      style={{
        margin: "30px 0px 0px 0px",
        padding: "0px 30px",
        display: "flex",
        alignItems: "center", 
      }}
    >
      <ListName />
      <Toolbar />
      <List style={{ width: "100%", marginTop:"0" }}>
        {listDetailData.itemList.map((item) => (
          <Item key={item.itemId} item={item}></Item>
        ))}
      </List>
      {isSmallScreen && <TemporaryDrawer />}
      </Stack>
      {/*<ItemList />*/}
    </Stack>
  );
}

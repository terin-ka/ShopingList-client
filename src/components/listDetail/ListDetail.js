import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userProvider";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { useTheme } from "@mui/material/styles";
import MemberList from "./MemberList";
import Toolbar from "./Toolbar";
import ListName from "./ListName";
import Item from "./Item";
import { Stack, CircularProgress, List } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ListDetail() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { listId } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const { setActiveDetail, listDetailData, DetailIsLoading, showUnresolvedItems } = useContext(ListOverviewContext);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    if (listId) {
      localStorage.setItem("activeDetail", listId);
      setActiveDetail(listId);
    }
  
    if (listDetailData?.memberList && Array.isArray(listDetailData.memberList)) {
      const isCurrentMember =
        listDetailData.memberList.includes(loggedInUser?._id) || 
        loggedInUser?._id === listDetailData?.owner;
      setIsMember(isCurrentMember);
    }
  }, [listId, setActiveDetail, listDetailData, loggedInUser]);

  if (DetailIsLoading) {
    return <CircularProgress />;
  }

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
      { listDetailData.itemList ? (listDetailData.itemList
        .filter((item) => !showUnresolvedItems || !item.resolved) // Filtr položek
        .map((item) => (
          <Item key={item.itemId} item={item}></Item>
      ))) : <CircularProgress/> }
      </List>
      </Stack>
    </Stack>
  );
}

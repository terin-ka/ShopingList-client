import { useContext } from "react";
import { ListDetailContext } from "../../contexts/listDetail.provider"; /////////////////////
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { UserContext } from "../../contexts/userProviderSimple";
import { useDeleteMember } from "../../hooks/listDeatil.hooks";
import { Stack, List, ListItem, Typography } from "@mui/material";
import AddMemberButton from "./AddMemberButton";
import LeaveButton from "./LeaveButton";
import DeleteButton from "./DeleteButton";

export default function MemberList() {
  const { handlerMap } = useContext(ListDetailContext); //////////////////////////////
  const { listDetailData } = useContext(ListOverviewContext);
  const { userList, loggedInUser } = useContext(UserContext);
  const owner = userList.find((user) => user._id === listDetailData.owner);

  const { mutate: deleteMember, isPending } = useDeleteMember();

  /*if (!listDetailData.memberList) {
    return <Stack />;
  }*/

  return (
    <Stack
      spacing={2}
      direction="column"
      style={{
        margin: "40px 0px 0px 0px",
        padding: "0px 20px 0px 20px",
        borderRight: "2px solid #56949F",
      }}
    >
      <Typography variant="h3">List Owner</Typography>
      <ListItem>
        <Typography variant="body1">{owner.name}</Typography>
      </ListItem>
      <Typography variant="h3">List Members</Typography>
      <List>
        {listDetailData.memberList.map((memberId) => {
          const member = userList.find((user) => user._id === memberId);

          return (
            <ListItem
              key={memberId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "left",
              }}
            >
              <Typography variant="body1">
                {member ? member.name : `User ID: ${memberId}`}
              </Typography>
              {loggedInUser?._id === listDetailData.owner ? (
                <DeleteButton
                  itemId={memberId}
                  userId={loggedInUser?._id}
                  listId={listDetailData?._id}
                  handleDelete={deleteMember}
                  disabled={isPending}
                />
              ) : (
                ""
              )}
            </ListItem>
          );
        })}
      </List>
      {loggedInUser?._id === listDetailData.owner ? <AddMemberButton /> : ""}
      {listDetailData.memberList.includes(loggedInUser?._id) ? (
        <LeaveButton />
      ) : (
        ""
      )}
    </Stack>
  );
}

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { UserContext } from "../../contexts/userProvider";
import { useDeleteMember } from "../../hooks/listDeatil.hooks";
import { useLeaveList } from "../../hooks/listDeatil.hooks";
import { Stack, List, Button, ListItem, Typography, IconButton, Tooltip, Dialog, DialogActions, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import AddMemberButton from "./AddMemberButton";

export default function MemberList() {
  const navigate = useNavigate();
  const { listDetailData } = useContext(ListOverviewContext);
  const { userList, loggedInUser } = useContext(UserContext);
  const owner = userList.find((user) => user._id === listDetailData.owner);
  const [open, setOpen] = useState(false);

  const { mutate: deleteMember, isPending: deletememberPending } = useDeleteMember();
  const { mutate: leaveList, isPending: leaveListPending} = useLeaveList();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNavigateToOverview = () => {
    navigate(`/overview`);
  };

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
                    <>
                    <Tooltip title="Delete">
                      <IconButton
                        color="primary"
                        onClick={handleOpen}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>Opravdu chcete odstranit tohoto člena?</DialogTitle>
                      <DialogActions>
                        <Button color="secondary" onClick={handleClose}>
                          Storno
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => {
                            handleClose();
                            deleteMember({ userId: loggedInUser?._id, listId: listDetailData?._id, memberId: memberId });
                          }}
                          disabled={deletememberPending }
                        >
                          Ano
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
              ) : (
                ""
              )}
            </ListItem>
          );
        })}
      </List>

      {loggedInUser?._id === listDetailData.owner ? <AddMemberButton /> : ""}

      {listDetailData.memberList.includes(loggedInUser?._id) ? (
        <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={handleOpen}>
          Leave
          <LogoutIcon fontSize="medium" style={{paddingLeft: "4px"}}/>
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Opravdu chcete odejít z tohoto listu?</DialogTitle>
          <DialogActions>
            <Button color="secondary" onClick={handleClose}>
              Storno
            </Button>
            <Button
              color="primary"
              onClick={() => {
                leaveList({ userId: loggedInUser?._id, listId: listDetailData?._id, memberId: loggedInUser?._id});
                handleNavigateToOverview();
              }}
              disabled={leaveListPending}
            >
              Potvrdit
            </Button>
          </DialogActions>
          </Dialog>
      </Stack>
      ) : (
        ""
      )}
    </Stack>
  );
}

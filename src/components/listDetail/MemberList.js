import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { UserContext } from "../../contexts/userProvider";
import { useDeleteMember } from "../../hooks/listDeatil.hooks";
import { useLeaveList } from "../../hooks/listDeatil.hooks";
import { Stack, List, Button, ListItem, Typography, IconButton, Tooltip, Dialog, DialogActions, DialogTitle, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import PieChart from "./Chart";
import AddMemberButton from "./AddMemberButton";
import { useTranslation } from 'react-i18next';

export default function MemberList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { listDetailData } = useContext(ListOverviewContext);
  const { userList, loggedInUser } = useContext(UserContext);
  const [ owner, setOwner ] = useState(userList ? userList.find((user) => user._id === listDetailData.owner): false);
  userList.find((user) => user._id === listDetailData.owner);
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
      style ={{
        margin: "40px 0px 0px 0px",
        padding: "0px 20px 0px 20px",
        borderRight: "2px solid",
      }}
    >
      <Typography variant="h3">{t('memberList.owner')}</Typography>
      <ListItem>
        <Typography variant="body1">{owner?.name}</Typography>
      </ListItem>
      <Typography variant="h3">{t('memberList.members')}</Typography>
      <List>
        {listDetailData.memberList ? (listDetailData.memberList.map((memberId) => {
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
                    <Tooltip title={t('detail.deleteTooltip')}>
                      <IconButton
                        color="primary"
                        onClick={handleOpen}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>{t('memberList.deleteQuestion')}</DialogTitle>
                      <DialogActions>
                        <Button color="secondary" onClick={handleClose}>
                        {t('dialog.cancel')}
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => {
                            handleClose();
                            deleteMember({ userId: loggedInUser?._id, listId: listDetailData?._id, memberId: memberId });
                          }}
                          disabled={deletememberPending }
                        >
                          {t('dialog.confirm')}
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
              ) : ("")}
            </ListItem>
          );
        })) : <CircularProgress/> }
      </List>

      {listDetailData ? (loggedInUser?._id === listDetailData?.owner ? <AddMemberButton /> : "") : <CircularProgress/>}

      {listDetailData.memberList ? (listDetailData.memberList.includes(loggedInUser?._id) ? (
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={handleOpen}>
        {t('memberList.leaveList')}
          <LogoutIcon fontSize="medium" style={{paddingLeft: "4px"}}/>
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{t('memberList.leaveQuestion')}</DialogTitle>
          <DialogActions>
            <Button color="secondary" onClick={handleClose}>
              {t('dialog.cancel')}
            </Button>
            <Button
              color="primary"
              onClick={() => {
                leaveList({ userId: loggedInUser?._id, listId: listDetailData?._id, memberId: loggedInUser?._id});
                handleNavigateToOverview();
              }}
              disabled={leaveListPending}
            >
              {t('dialog.confirm')}
            </Button>
          </DialogActions>
          </Dialog>
      </Stack>
      ) : ("")) : <CircularProgress/>}
      <PieChart/>
    </Stack>
  );
}

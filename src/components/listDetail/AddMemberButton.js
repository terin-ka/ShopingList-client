import { UserContext } from "../../contexts/userProvider";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { useState, useContext } from "react";
import { useAddMember } from "../../hooks/listDeatil.hooks";
import AddIcon from "@mui/icons-material/Add";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useTranslation } from 'react-i18next';

export default function AddMemberButton() {
  const { t } = useTranslation();
  const { listDetailData } = useContext(ListOverviewContext);
  const { userList, loggedInUser } = useContext(UserContext);
  const [memberId, setMemberId] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate: addMember, isPending } = useAddMember();
  const newUserList = userList.filter((user) => user._id !== listDetailData.owner);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memberId) {
      addMember({ userId: loggedInUser?._id, listId: listDetailData?._id, memberId: memberId });
      handleClose();
    }
  };

  return (
    <>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={handleOpen}>
        {t('memberList.addMember')}
          <AddIcon />
        </Button>
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
          sx: { width: "50%" },
        }}
      >
        <DialogTitle>{t('memberList.addMember')}</DialogTitle>
        <DialogContent sx={{ pt: 4 }}>
          <Autocomplete
            sx={{ mt: 2 }}
            fullWidth
            disablePortal={false} //umožní rozbalení mimo běžný DOM strom componenty
            options={newUserList}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              setMemberId(newValue ? newValue._id : "");
            }}
            renderInput={(params) => <TextField {...params} label={t('dialog.user')} />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            {t('dialog.cancel')}
          </Button>
          <Button type="submit" color="primary" disabled={!memberId || isPending}>
            {t('dialog.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

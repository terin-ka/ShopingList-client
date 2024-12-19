import { UserContext } from "../../contexts/userProviderSimple";
import { ListDetailContext } from "../../contexts/listDetail.provider";
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

export default function AddMemberButton() {
  const { handlerMap } = useContext(ListDetailContext);
  const { listDetailData } = useContext(ListOverviewContext);
  const { userList, loggedInUser } = useContext(UserContext);
  const [memberId, setMemberId] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate: addMember, isPending } = useAddMember();
  const newUserList = userList.filter((user) => user._id !== listDetailData.owner);

  const handleClose = () => {
    setOpen(false);
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
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
          sx: { width: "50%" },
        }}
      >
        <DialogTitle>Add Member</DialogTitle>
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
            renderInput={(params) => <TextField {...params} label="User" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button type="submit" color="primary" disabled={!memberId || isPending}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Add Member
          <AddIcon />
        </Button>
      </Stack>
    </>
  );
}

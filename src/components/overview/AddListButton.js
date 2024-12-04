import { useContext, useState } from "react";
import { UserContext } from "../../contexts/userProviderSimple";
import { useCreateList } from "../../hooks/list.hooks";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Stack,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function AddListButton() {
  const { loggedInUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");

  const { mutate: createNewList, isLoading } = useCreateList();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setListName("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewList(
      { userId: loggedInUser?._id, listName },
      {
        onSuccess: () => handleClose(),
      }
    );
  };

  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined" onClick={handleClickOpen}>
        Add List
        <AddIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>New Shopping List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

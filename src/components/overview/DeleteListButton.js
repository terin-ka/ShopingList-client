import { useState, useContext } from "react";
import { UserContext } from "../../contexts/userProviderSimple";
import { useDeleteList } from "../../hooks/list.hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";

export default function DeleteListButton({ listId }) {
  const { loggedInUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const { mutate: deleteList, isLoading } = useDeleteList();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    deleteList(
      { userId: loggedInUser._id, listId },
      {
        onSuccess: () => handleClose(),
      }
    );
  };

  return (
    <>
      <Tooltip title="Delete">
        <IconButton
          color="primary"
          onClick={() => {
            handleClickOpen();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Opravdu chcete odstranit tento nákupní list?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

import { useContext, useState } from "react";
import { UserContext } from "../../contexts/userProviderSimple";
import { useMutation } from "@tanstack/react-query";
import ListService from "../../services/list.service";
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
  
  const {loggedInUser} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");
  //const owner = loggedInUser?._id;
  //const { handlerMap } = useContext(ListOverviewContext);

  const mutation = useMutation({
    mutationFn: async ({ userId, listName }) => {
      const response = await ListService.createList(userId, listName);
      return response;
    },
    onSuccess: (data) => {
      console.log("List created successfully:", data);
      handleClose(); // Zavřete dialog
    },
    onError: (error) => {
      console.error("Error creating list:", error);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({ userId: loggedInUser?._id, listName });
    setListName(""); // Vymaže pole po uložení
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
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

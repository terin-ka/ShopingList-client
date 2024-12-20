import { useContext, useState } from "react";
import { UserContext } from "../../contexts/userProvider";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { useCreateItem } from "../../hooks/listDeatil.hooks";
import AddIcon from "@mui/icons-material/Add";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

export default function AddItemButton() {
  const { listDetailData } = useContext(ListOverviewContext);
  const { loggedInUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [count, setCount] = useState("");

  const { mutate: createItem, isPending} = useCreateItem();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createItem({
      userId: loggedInUser?._id,
      listId: listDetailData?._id,
      name: name,
      count: count ? parseInt(count, 10) : 1,
    });
    setName("");
    setCount("");
    handleClose();
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
        <DialogTitle>Create New Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Count"
            type="number"
            fullWidth
            variant="outlined"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            helperText="Leave blank to default to 1"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button type="submit" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={handleOpen}>
          Add Item
          <AddIcon />
        </Button>
      </Stack>
    </>
  );
}

import { useContext, useState } from "react";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { UserContext } from "../../contexts/userProvider";
import { Stack, IconButton, Typography, Tooltip } from "@mui/material";
import { Button, TextField, DialogActions, DialogContent, DialogTitle, Dialog} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useUpdateListName } from "../../hooks/listDeatil.hooks";

export default function ListName() {
  const { listDetailData } = useContext(ListOverviewContext);
  const { loggedInUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(listDetailData.listName);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { mutate: updateListName, isPending } = useUpdateListName();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateListName({ userId: loggedInUser?._id, listId: listDetailData?._id, listName: name }); 
    handleClose();
  };

  return (
    <Stack spacing={2} direction="row">
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
          sx:{ width: "50%"},
        }}
      >
        <DialogTitle>Update Name</DialogTitle>
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
            onChange={(e) => setName(e.target.value)} // Nastaví nový název
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button type="submit" color="primary" disabled={isPending}>
            Save Changes
          </Button>
        </DialogActions>
    </Dialog>
      <Typography variant={isSmallScreen ? "h2" : "h1"}>{listDetailData.listName}</Typography>

      {loggedInUser?._id === listDetailData.owner ? (
        <Tooltip title="Rename" placement="right">
          <IconButton color="primary" onClick={() => setOpen(true)}>
            <EditIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </Stack>
  );
}

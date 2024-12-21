import { useContext, useState } from "react";
import { UserContext } from "../../contexts/userProvider";
import { useCreateList } from "../../hooks/listOverview.hooks";
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
import { useTranslation } from 'react-i18next';

export default function AddListButton() {
  const { t } = useTranslation();
  const { loggedInUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");

  const { mutate: createNewList, isPending } = useCreateList();

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
        {t('overview.addList')}
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
        <DialogTitle>{t('overview.addList')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label={t('dialog.name')}
            type="text"
            fullWidth
            variant="outlined"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" disabled={isPending}>
          {t('dialog.cancel')}
          </Button>
          <Button type="submit" disabled={isPending}>{t('dialog.confirm')}</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

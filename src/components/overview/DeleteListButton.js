import { useState, useContext } from "react";
import { UserContext } from "../../contexts/userProvider";
import { useDeleteList } from "../../hooks/listOverview.hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";
import { useTranslation } from 'react-i18next';

export default function DeleteListButton({ listId }) {
  const { t } = useTranslation();
  const { loggedInUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const { mutate: deleteList, isPending } = useDeleteList();

  const handleOpen = () => {
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
      <Tooltip title={t('overview.deleteTooltip')}>
        <IconButton
          color="primary"
          onClick={() => {
            handleOpen();
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
          <Button onClick={handleClose} color="secondary" disabled={isPending}>
          {t('dialog.cancel')}
          </Button>
          <Button type="submit" disabled={isPending}>{t('dialog.confirm')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

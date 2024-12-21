import { useContext, useState } from "react";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { UserContext } from "../../contexts/userProvider";
import { Stack, IconButton, Typography, Tooltip } from "@mui/material";
import { Button, TextField, DialogActions, DialogContent, DialogTitle, Dialog} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useUpdateListName } from "../../hooks/listDeatil.hooks";
import { useTranslation } from 'react-i18next';

export default function ListName() {
  const { t } = useTranslation();
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateListName({ userId: loggedInUser?._id, listId: listDetailData?._id, listName: name }); 
    handleClose();
  };

  return (
    <Stack spacing={2} direction="row">
      <Typography variant={isSmallScreen ? "h2" : "h1"}>{listDetailData.listName}</Typography>
      {loggedInUser?._id === listDetailData.owner ? (
        <Tooltip title={t('detail.renameTooltip')} placement="right">
          <IconButton color="primary" onClick={handleOpen}>
            <EditIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      ) : ("")}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
          sx:{ width: "50%"},
        }}
      >
        <DialogTitle>{t('detail.updateDialogName')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label={t('dialog.name')}
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)} // Nastaví nový název
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            {t('dialog.cancel')}
          </Button>
          <Button type="submit" color="primary" disabled={isPending}>
            {t('dialog.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

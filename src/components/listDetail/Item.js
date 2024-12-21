import { useContext, useState } from "react";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import { UserContext } from "../../contexts/userProvider";
import { ListItem, Stack, Typography, Dialog, DialogTitle, DialogActions, Button, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteItem } from "../../hooks/listDeatil.hooks";
import CheckButton from "./CheckButton";
import { useTranslation } from 'react-i18next';

export default function Item({ item }) {
  const { t } = useTranslation();
  const { listDetailData } = useContext(ListOverviewContext);
  const { loggedInUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const { mutate: deleteItem, isPending} = useDeleteItem();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ListItem
      sx={{
        boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.16)",
        margin: "20px 0px",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "700px",
      }}
    >
      <Typography
        variant="body1"
        sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {item.itemName}
      </Typography>
      <Stack direction="row">
        <Typography variant="body1" sx={{ margin: "5px", padding: "5px" }}>
          {item.count}x
        </Typography>
        <CheckButton itemId={item.itemId} />
        <>
          <Tooltip title={t('detail.deleteTooltip')} placement="right">
            <IconButton
              color="primary"
              onClick={handleOpen}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Opravdu chcete odstranit tohoto člena?</DialogTitle>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>
                Storno
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  handleClose();
                  deleteItem({ userId: loggedInUser?._id, listId: listDetailData?._id, itemId: item.itemId });
                }}
                disabled={isPending}
              >
                Ano
              </Button>
            </DialogActions>
          </Dialog>
        </>
      </Stack>
    </ListItem>
  );
}

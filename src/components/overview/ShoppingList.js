import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userProvider";
import ArchiveButton from "./ArchiveButton";
import DeleteListButton from "./DeleteListButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useTranslation } from 'react-i18next';

export default function ShoppingList({ list }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userList, loggedInUser } = useContext(UserContext);
  const maxVisibleItems = 3;
  const ownerName = Array.isArray(userList) && userList.find((user) => user._id === list.owner)?.name || "Unknown Owner";

  const handleNavigateToDetail = () => {
    navigate(`/listDetail/${list._id}`);
  };

  return (
    <Card
      sx={{
        position: "relative",
        marginTop: "20px",
        width: "200px",
        minHeight: "280px",
      }}
    >
      <CardHeader avatar={<Avatar />} title={ownerName} />
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {list.listName}
        </Typography>
        {list.itemList.slice(0, maxVisibleItems).map((item) => (
          <Typography
            key={item.itemId}
            variant="body1"
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            • {item.itemName}
          </Typography>
        ))}
        {list.itemList.length > maxVisibleItems && (
          <Typography variant="body1" color="text.secondary">
            {t('overview.')}
          </Typography>
        )}
      </CardContent>
      {loggedInUser?._id === list.owner ? (
        <CardActions
          sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        >
          <ArchiveButton listId={list._id} isArchived={list.isArchived}/>
          <DeleteListButton
            listId={list._id}
          />
          <Tooltip title={t('overview.detailTooltip')}>
            <IconButton color="primary" onClick={handleNavigateToDetail}>
              <VisibilityOutlinedIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      ) : (
        <CardActions
          sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        >
          <Tooltip title={t('overview.detailTooltip')}>
            <IconButton color="primary" onClick={handleNavigateToDetail}>
              <VisibilityOutlinedIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      )}
    </Card>
  );
}

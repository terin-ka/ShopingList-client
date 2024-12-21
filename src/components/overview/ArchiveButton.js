import { useContext } from "react";
import { UserContext } from "../../contexts/userProvider";
import { useToggleArchive } from "../../hooks/listOverview.hooks";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from 'react-i18next';

export default function ArchiveButton({ listId, isArchived }) {
  const { t } = useTranslation();
  const { loggedInUser } = useContext(UserContext);

  const { mutate: toggleArchive, isPending } = useToggleArchive();

  const handleArchiveClick = () => {
    toggleArchive({ userId: loggedInUser?._id, listId });
  };

  return (
    <Tooltip title={t('overview.archiveTooltip')}>
      <IconButton
        color="primary"
        onClick={handleArchiveClick}
        disabled={isPending}
      >
        {isArchived ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </Tooltip>
  );
}

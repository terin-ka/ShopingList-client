import { useContext } from "react";
import { UserContext } from "../../contexts/userProviderSimple";
import { useToggleArchive } from "../../hooks/listOverview.hooks";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { IconButton, Tooltip } from "@mui/material";

export default function ArchiveButton({ listId, isArchived }) {
  const { loggedInUser } = useContext(UserContext);

  const { mutate: toggleArchive, isPending } = useToggleArchive();

  const handleArchiveClick = () => {
    toggleArchive(
      { userId: loggedInUser?._id, listId },
      {
        onError: (error) => {
          console.error("Archiving failed:", error);
        },
      }
    );
  };

  return (
    <Tooltip title="Archive">
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

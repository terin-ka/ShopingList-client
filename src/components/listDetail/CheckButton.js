import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/userProvider";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import Checkbox from "@mui/material/Checkbox";
import { useToggleResolveItem } from "../../hooks/listDeatil.hooks";

export default function CheckButton({ itemId }) {
  const { loggedInUser} = useContext(UserContext);
  const { listDetailData } = useContext(ListOverviewContext);
  const [checked, setChecked] = useState(false);
  const item = listDetailData.itemList.find((item) => item.itemId === itemId);

  const { mutate: toggleResolveItem, isPending } = useToggleResolveItem();

  useEffect(() => {
    if (item) {
      setChecked(item.resolved);
    }
  }, [item]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    toggleResolveItem({ userId: loggedInUser?._id, listId: listDetailData?._id, itemId: itemId });
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
      disabled={isPending}
    />
  );
}

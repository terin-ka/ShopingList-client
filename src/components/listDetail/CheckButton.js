import { useState, useEffect, useContext } from "react";
import { ListDetailContext } from "../../contexts/listDetail.provider";
import { ListOverviewContext } from "../../contexts/listOverview.provider";
import Checkbox from "@mui/material/Checkbox";

export default function CheckButton({ itemId }) {
  const { handlerMap } = useContext(ListDetailContext);
  const { listDetailData } = useContext(ListOverviewContext);
  const [checked, setChecked] = useState(false);
  const item = listDetailData.itemList.find((item) => item.itemId === itemId);

  useEffect(() => {
    if (item) {
      setChecked(item.resolved);
    }
  }, [item]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    handlerMap.toggleResolveItem({ id: itemId });
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}

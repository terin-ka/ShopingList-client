import { useContext } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { ListOverviewContext } from "../../contexts/listOverview.provider";

export default function Chart() {
  const { itemCount, completedItemCount } = useContext(ListOverviewContext);

  return (
    <Gauge
      width={150}
      height={200}
      value={completedItemCount}
      valueMax={itemCount}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 20,
          transform: 'translate(0px, 0px)',
        },
      }}
      text={
        ({ value, valueMax }) => `${value} / ${valueMax}`
      }
    />
  );
}

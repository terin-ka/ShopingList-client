import { createContext, useState, useMemo, useContext } from "react";
import { UserContext } from "./userProviderSimple";
import { useListOverviewData } from "../hooks/list.hooks";

export const ListOverviewContext = createContext();

function ListOverviewProvider({ children }) {

  const { loggedInUser } = useContext(UserContext);
  const [showArchived, setShowArchived] = useState(false);

  const { data: listOverviewData, isLoading, isError } = useListOverviewData(
    loggedInUser?._id,
    showArchived
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading lists.</p>;

  const value = {
    overviewData: listOverviewData,
    showArchived,
    toggleShowArchived: () => setShowArchived((current) => !current),
  };

  return (
    <ListOverviewContext.Provider value={value}>
      {children}
    </ListOverviewContext.Provider>
  );
}

export default ListOverviewProvider;

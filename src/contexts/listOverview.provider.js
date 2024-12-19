import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./userProviderSimple";
import { useListOverviewData } from "../hooks/listOverview.hooks";
import { useListData } from "../hooks/listOverview.hooks";

export const ListOverviewContext = createContext();

function ListOverviewProvider({ children }) {
  const { loggedInUser } = useContext(UserContext);
  const [showArchived, setShowArchived] = useState(false);
  const [activeDetail, setActiveDetail] = useState(localStorage.getItem("activeDetail"));
  //const [listDetailData, setListDetailData] = useState(null);

  const { data: listOverviewData, isLoading, isError } = useListOverviewData(loggedInUser?._id, showArchived);
  const { data: listDetailData, isLoading: DetailIsLoading, isError: DetailIsError } = useListData(loggedInUser?._id, activeDetail)

 /* useEffect(() => {
    if(activeDetail){
      const result = listOverviewData.find(list => list?._id === activeDetail);
      setListDetailData(result);
    }
  }, [activeDetail])*/

  const value = {
    overviewData: listOverviewData,
    listDetailData: listDetailData,
    isLoading,
    isError,
    DetailIsLoading,
    DetailIsError,
    activeDetail,
    setActiveDetail,
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

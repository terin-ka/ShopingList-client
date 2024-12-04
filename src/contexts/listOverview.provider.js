import { createContext, useState, useMemo, useContext } from "react";
import { UserContext } from "./userProviderSimple";
import ListService from "../services/list.service";
import { useQuery } from "@tanstack/react-query";

export const ListOverviewContext = createContext();
function ListOverviewProvider({ children }) {
  const { loggedInUser } = useContext(UserContext);
  const [showArchived, setShowArchived] = useState(false);

  const fetchListData = async ({ queryKey }) => {
    const [_key, { userId, showArchived }] = queryKey; // eslint-disable-line no-unused-vars
    if (showArchived) {
      return await ListService.getArchivedLists(userId);
    }
    return await ListService.getAllLists(userId);
  };

  const { data: listOverviewData, isPending, isError,} = useQuery({
    queryKey: ["list", { userId: loggedInUser?._id, showArchived }],
    queryFn: fetchListData,
    enabled: !!loggedInUser,
  });

  if (isPending) return <p>Loading...</p>;
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

 /* const [overviewData, setOverviewData] = useState([
    {
      listId: "tdl01",
      name: "Nákupní list 1",
      isArchived: false,
      owner: "u1",
      memberList: ["u3", "u2"],
      itemList: [{ id: "01", name: "Jablko", count: 5, resolved: false }],
    },
    {
      listId: "tdl02",
      name: "Nákupní list 2",
      isArchived: false,
      owner: "673dd06dea25d3473b2acd68",
      memberList: ["u4", "u1"],
      itemList: [
        { id: "01", name: "Brambůrky", count: 5, resolved: false },
        { id: "02", name: "Okurka", count: 1, resolved: false },
        { id: "03", name: "Nanuk", count: 2, resolved: false },
        { id: "04", name: "máslo", count: 2, resolved: false },
      ],
    },
  ]);*/

  /*const [showArchived, setShowArchived] = useState(false);

  const filteredData = useMemo(() => {
    if (!Array.isArray(overviewData)) {
      console.error("overviewData is not iterable:", overviewData);
      return [];
    }
    if (showArchived) {
      return overviewData.filter((list) => list.isArchived);
    } else {
      return [...overviewData];
    }
  }, [overviewData, showArchived]);*/

/*const value = {
  overviewData: listOverviewData,
  setOverviewData: setOverviewData,
  handlerMap: {
    handleCreateList: ({ name, owner }) => {
      setOverviewData((current) => [
          ...current,
          {
            listId: Math.random().toString(),
            name: name,
            isArchived: false,
            owner: owner,
            memberList: [], 
            itemList: [],  
          },
      ]);
    },
    handleDeleteList: ({ id }) => {
      setOverviewData((current) => {
        return current.filter((list) => list.listId !== id);
      });
    },
    handleArchive: ({ id }) => {
      setOverviewData((current) => {
        const index = current.findIndex((list) => list.listId === id);
        const updatedList = {
          ...current[index],
          isArchived: !current[index].isArchived,
        };
        return [
          ...current.slice(0, index),
          updatedList,
          ...current.slice(index + 1),
        ];
      });
    },
  },
  showArchived,
  toggleShowArchived: () => setShowArchived((current) => !current),
};*/

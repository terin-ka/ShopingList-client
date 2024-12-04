import { createContext, useState} from "react";

export const ListDetailContext = createContext();

function ListDetailProvider({ children }) {
  const [listData, setListData] = useState(null);

  const value = {
    listDetailData: listData,
    setListDetailData: setListData,
    handlerMap: {
      handleRename: {},
      handleCreateItem: {},
      toggleResolveItem: {},
      handleDeleteItem: {},
      handleDeleteMember: {},
      handleAddMember: {},
  }}

  return (
    <ListDetailContext.Provider value={value}>
      {children}
    </ListDetailContext.Provider>
  );
}

export default ListDetailProvider;

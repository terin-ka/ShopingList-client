import { createContext } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUsersData } from "../hooks/user.hooks";

export const UserContext = createContext();
function UserProviderSimple({ children }) {

  const { data: userData, isLoading, isError, error } = useUsersData();
  //const [loggedInUser, setLoggedInUser] = useState({_id:"673dd06dea25d3473b2acd68", name: "Aragorn"});
  const [loggedInUser, setLoggedInUser] = useState(null);

  const value = {
    userList: userData,
    loggedInUser: loggedInUser,
    setLoggedInUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
export default UserProviderSimple;

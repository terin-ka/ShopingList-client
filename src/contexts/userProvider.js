import { createContext } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUsersData } from "../hooks/user.hooks";

export const UserContext = createContext();
function UserProviderSimple({ children }) {

  const { data: userData, isLoading, isError, error } = useUsersData();
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  //const [loggedInUser, setLoggedInUser] = useState(() => localStorage.getItem("loggedInUser") ?? null);
  //const [loggedInUser, setLoggedInUser] = useState(null);
  console.log(loggedInUser)

  const value = {
    userList: userData,
    loggedInUser: loggedInUser,
    setLoggedInUser,
    isLoading,
    isError,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
export default UserProviderSimple;

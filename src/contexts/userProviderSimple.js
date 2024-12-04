import { createContext } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoginService from "../services/login.service";

export const UserContext = createContext();
function UserProviderSimple({ children }) {

  const fetchUserData = async ({ queryKey }) => {
    const [_key] = queryKey; // eslint-disable-line no-unused-vars
    const row = await LoginService.getAllUsers();
    return row;
  };

  const { data: userData, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
  });

  /*const userList = [
    { id: "u1", name: "Aragorn", email: "aragorn@gmail.com" },
    { id: "u2", name: "Legolas", email: "legolas@gmail.com" },
    { id: "u3", name: "Gimli", email: "gimli@gmail.com" },
    { id: "u4", name: "Galadriel", email: "galadriel@gmail.com" },
    { id: "u5", name: "Gandalf", email: "gandalf@gmail.com" },
    { id: "u6", name: "Balrog", email: "balrog@gmail.com" },
  ];*/
  const [loggedInUser, setLoggedInUser] = useState({_id:"673dd06dea25d3473b2acd68", name: "Aragorn"});
  //const [loggedInUser, setLoggedInUser] = useState(null);

  const value = {
    userList: userData,
    loggedInUser: loggedInUser,
    setLoggedInUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
export default UserProviderSimple;

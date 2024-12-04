import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/user.service";

// Hook pro načítání uživatelů
export function useUsersData() {
  const fetchUserData = async () => {
    const row = await getAllUsers(); 
    return row;
  };
  return useQuery({
    queryKey: ["user"], 
    queryFn: fetchUserData,
  });
}

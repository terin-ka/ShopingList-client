import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllLists, getArchivedLists, createList, deleteList, getList, toggleArchive } from "../services/list.service";

export function useListOverviewData(userId, showArchived) {
  const fetchListOverviewData = async () => {
    if (showArchived) {
      return await getArchivedLists(userId);
    }
    const row = await getAllLists(userId);
    return row;
  };

  return useQuery({
    queryKey: ["listsOverview", { userId, showArchived }],
    queryFn: fetchListOverviewData,
    enabled: !!userId,
  });
}

export function useToggleArchive() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, listId }) => {
      return await toggleArchive(userId, listId);
    },
    onSuccess: (data) => {
      console.log("List successfully toggled:", data);
      queryClient.invalidateQueries(["listsOverview"]);
    },
    onError: (error) => {
      console.error("Error toggle archive: ", error.message);
    },
  });
}

export function useListData(userId, listId) {
  const fetchListData = async () => {
    if (!userId || !listId) {
      throw new Error("Missing userId or listName");
    }
    return await getList(userId, listId);
  };

  return useQuery({
    queryKey: ["list", { userId, listId }],
    queryFn: fetchListData,
    enabled: !!userId,
  });
}

export function useCreateList() {
  const queryClient = useQueryClient(); // Pro aktualizaci dat po vytvoření

  return useMutation({
    mutationFn: async ({ userId, listName }) => {
      if (!userId || !listName) {
        throw new Error("Missing userId or listName");
      }
      return await createList(userId, listName);
    },
    onSuccess: (data) => {
      console.log("List successfully created:", data);
      queryClient.invalidateQueries(["listsOverview"]);
    },
    onError: (error) => {
      console.error("Error creating list:", error.message);
    },
  });
}

export function useDeleteList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, listId }) => {
      if (!userId || !listId) {
        throw new Error("Missing userId or listId");
      }
      return await deleteList(userId, listId);
    },
    onSuccess: (data) => {
      console.log("List successfully deleted:", data);
      queryClient.invalidateQueries(["listsOverview"]);
    },
    onError: (error) => {
      console.error("Error creating list:", error.message);
    },
  });
}
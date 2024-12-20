import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMember, addMember, updateListName, leaveList, createItem, deleteItem, toggleResolveItem, getUnresolvedItems} from "../services/listDetail.service";

export function useDeleteMember() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ userId, listId, memberId }) => {
        if (!userId || !listId || !memberId) {
          throw new Error("Missing userId, listId or memberId");
        }
        return await deleteMember(userId, listId, memberId);
      },
      onSuccess: (data) => {
        console.log("Member successfully deleted:", data);
        queryClient.invalidateQueries(["list"]);
      },
      onError: (error) => {
        console.error("Error deleting member:", error.message);
      },
    });
  }

export function useLeaveList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, listId, memberId }) => {
      if (!userId || !listId || !memberId) {
        throw new Error("Missing userId, listId or memberId");
      }
      return await leaveList(userId, listId, memberId);
    },
    onSuccess: (data) => {
      console.log("Member successfully deleted:", data);
      queryClient.invalidateQueries(["list"]);
    },
    onError: (error) => {
      console.error("Error deleting member:", error.message);
    },
  });
}

export function useAddMember() {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: async ({ userId, listId, memberId }) => {
      if (!userId || !listId || !memberId) {
          throw new Error("Missing userId, listId or memberId");
      }
      return await addMember(userId, listId, memberId);
      },
      onSuccess: (data) => {
      console.log("Member successfully added:", data);
      queryClient.invalidateQueries(["list"]);
      },
      onError: (error) => {
      console.error("Error adding member:", error.message);
      },
  });
}

export function useUpdateListName() {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: async ({ userId, listId, listName }) => {
      if (!userId || !listId || !listName) {
          throw new Error("Missing userId, listId or listName");
      }
      return await updateListName(userId, listId, listName);
      },
      onSuccess: (data) => {
      console.log("List successfully updated", data);
      queryClient.invalidateQueries(["list"]);
      },
      onError: (error) => {
      console.error("Error updating list name:", error.message);
      },
  });
  }

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: async ({ userId, listId, name, count }) => {
      if (!userId || !listId || !name  || !count) {
          throw new Error("Missing userId, listId, name or count");
      }
      return await createItem(userId, listId, name, count);
      },
      onSuccess: (data) => {
      console.log("Item succesfully ctreated", data);
      queryClient.invalidateQueries(["list"]);
      },
      onError: (error) => {
      console.error("Error creating item:", error.message);
      },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: async ({ userId, listId, itemId }) => {
      if (!userId || !listId || !itemId) {
          throw new Error("Missing userId, listId or itemId");
      }
      return await deleteItem(userId, listId, itemId);
      },
      onSuccess: (data) => {
      console.log("Item succesfully deleted", data);
      queryClient.invalidateQueries(["list"]);
      },
      onError: (error) => {
      console.error("Error deleting item:", error.message);
      },
  });
}

export function useToggleResolveItem() {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: async ({ userId, listId, itemId }) => {
      if (!userId || !listId || !itemId) {
          throw new Error("Missing userId, listId or itemId");
      }
      return await toggleResolveItem(userId, listId, itemId);
      },
      onSuccess: (data) => {
      console.log("Item succesfully toggeled", data);
      queryClient.invalidateQueries(["list"]);
      },
      onError: (error) => {
      console.error("Error toggeling item:", error.message);
      },
  });
}
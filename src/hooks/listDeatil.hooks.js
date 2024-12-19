import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMember, addMember } from "../services/listDetail.service";

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
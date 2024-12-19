import api from "./api";

export async function deleteMember(userId, listId, memberId) {
    try {
      let response = await api.delete(`list/deleteMember/${listId}`, 
      {
        headers: { user_id: userId }, 
        data: { memberId },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message ?? error.message);
    }
  };

  export async function addMember(userId, listId, memberId) {
    try {
      let response = await api.post(`list/addMember/${listId}`, {
        memberId
      },
      {
        headers: { user_id: userId }, 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message ?? error.message);
    }
  };
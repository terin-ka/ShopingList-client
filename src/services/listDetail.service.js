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

  export async function leaveList(userId, listId, memberId) {
    try {
      let response = await api.post(`list/leaveList/${listId}`,{
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

  export async function updateListName(userId, listId, listName) {
    try {
      let response = await api.patch(`list/update/${listId}`, {
        listName
      },
      {
        headers: { user_id: userId }, 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message ?? error.message);
    }
  };

  export async function createItem(userId, listId, name, count) {
    try {
      let response = await api.post(`list/createItem/${listId}`, {
        name, count
      },
      {
        headers: { user_id: userId }, 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message ?? error.message);
    }
  };

  export async function deleteItem(userId, listId, itemId) {
    try {
      let response = await api.delete(`list/deleteItem/${listId}`,
      {
        headers: { user_id: userId }, 
        data: { itemId },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message ?? error.message);
    }
  };

  export async function toggleResolveItem(userId, listId, itemId) {
    try {
      let response = await api.patch(`list/toggleResolveItem/${listId}`, {
        itemId
      },
      {
        headers: { user_id: userId }, 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message ?? error.message);
    }
  };
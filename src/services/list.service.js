import api from "./api";

export async function getAllLists(userId) {
  try {
    let response = await api.get("list/getAll", {
      headers: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message);
  }
};

export async function getArchivedLists(userId) {
  try {
    let response = await api.get("list/getArchived", {
      headers: { user_id: userId }, 
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message);
  }
};

export async function toggleArchive(userId, listId) {
  try {
    console.log(userId);
    let response = await api.patch(`list/toggleArchive/${listId}`,{}, {
      headers: { user_id: userId }, 
    });
    return response.data;
  } catch (error) {
    console.error("API error:", error.response || error.message); // Debug: Detailní chyba
    throw new Error(error.response?.data?.message ?? error.message);
  }
};

export async function getList(userId, listId) {
  try {
    let response = await api.get(`list/getList/${listId}`, 
    {
      headers: { user_id: userId }, 
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message);
  }
};

export async function createList(userId, listName) {
  try {
    let response = await api.post("list/create", {
      listName,
    }, {
      headers: { user_id: userId }, 
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message);
  }
};

export async function deleteList(userId, listId) {
  try {
    let response = await api.delete(`list/delete/${listId}`, 
    {
      headers: { user_id: userId }, 
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message);
  }
};


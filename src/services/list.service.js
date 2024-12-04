import api from "./api";

async function getAllLists(userId) {
  try {
    let response = await api.get("list/getAll", {
      headers: { user_id: userId }, // Přidám hlavičku s userId
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message);
  }
};

async function getArchivedLists(userId) {
  try {
    let response = await api.get("list/getArchived", {
      headers: { user_id: userId }, 
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message);
  }
};

async function createList(userId, listName) {
  try {
    console.log("Axios Request Body:", { listName });
    console.log("Axios Headers:", { user_id: userId });
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

const ListService = {
  getAllLists,
  getArchivedLists,
  createList,
};

export default ListService;

import api from "./api";

export async function getAllUsers() {
  try {
    let response = await api.get("login/getAll");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message);
  }
};


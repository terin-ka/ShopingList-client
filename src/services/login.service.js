import api from "./api";

async function getAllUsers() {
  try {
    let response = await api.get("login/getAll");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message);
  }
};

const LoginService = {
  getAllUsers,
};

export default LoginService;

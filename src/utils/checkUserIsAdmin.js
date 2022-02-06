import axios from "axios";
export const checkUserIsAdmin = (user) => {
  const { userRoles } = user;
  if (userRoles.length < 1) {
    return false;
  }
  if (userRoles.indexOf("admin") === -1) {
    return false;
  }
  return true;
};
export const instance = axios.create({
  baseURL: "http://localhost:5001/holame-2f877/us-central1/api",
});

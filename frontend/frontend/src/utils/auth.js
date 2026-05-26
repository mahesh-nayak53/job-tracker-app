export const getToken = () => localStorage.getItem("token");

export const logout = () => {
  localStorage.removeItem("token");
};

// export const getToken = () => {
//   return localStorage.getItem("token");
// };

export const getRole = () => {
  return localStorage.getItem("role");
};

export const isAdmin = () => {
  return getRole() === "ROLE_ADMIN";
};

export const isUser = () => {
  return getRole() === "ROLE_USER";
};

import { API_BASE_URL } from "./config";

export const host = API_BASE_URL;
export const registerRoute = `${host}/api/auth/signup`;
export const loginRoute = `${host}/api/auth/login`;
export const nRegisterRoute = `${host}/api/authn/nsignup`;
export const nLoginRoute = `${host}/api/authn/nlogin`;
export const nGetAllRoute = `${host}/api/authn/ngetAll`;
export const getNurseryByIdRoute = (nurseryId) =>
  `${host}/api/authn/nursery/${nurseryId}`;

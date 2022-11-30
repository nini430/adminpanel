import { actionTypes } from "./actionTypes";

export const loginUser=(payload)=>({type:actionTypes.LOGIN_USER,payload});
export const logoutUser=()=>({type:actionTypes.LOGOUT_USER});
export const blockOrDeleteUser=(payload)=>({type:actionTypes.BLOCK_OR_DELETE_USER,payload});






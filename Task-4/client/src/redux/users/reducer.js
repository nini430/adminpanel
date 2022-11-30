import { actionTypes } from "./actionTypes"
const initialState={
    currentUser:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null
}


const authReducer=(state=initialState,action)=>{
    
        switch(action.type) {
            case actionTypes.LOGIN_USER:
                localStorage.setItem("user",JSON.stringify(action.payload))
                return {
                    ...state,
                    currentUser:action.payload
                }
            case actionTypes.LOGOUT_USER:
                localStorage.removeItem("user");
                return {
                    ...state,currentUser:null
                }
            case actionTypes.BLOCK_OR_DELETE_USER:
                const updatedUser={...state.currentUser,status:action.payload};
                localStorage.setItem("user",JSON.stringify(updatedUser));
                return {
                    ...state,currentUser:updatedUser
                }
            default:return state;
        }
}

export default authReducer;
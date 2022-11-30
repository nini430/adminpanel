import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"


export const AuthRoute=({children})=>{
    const currentUser=useSelector(store=>store.auth.currentUser);
    if(!currentUser) {
      return <Navigate to="/login"/>
    }else{
        return children;
    }
  }
  
  export const NonAuthRoute=({children})=>{
    const currentUser=useSelector(store=>store.auth.currentUser);
    if(currentUser) {
      return <Navigate to="/"/>
    }else{
        return children;
    }
  }
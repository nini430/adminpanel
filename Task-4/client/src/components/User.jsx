import React from 'react'
import {useDispatch, useSelector,} from "react-redux"
import {Dropdown} from "react-bootstrap"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {logoutUser} from "../redux/users/actions"

 const User = () => {
    const navigate=useNavigate();
  const dispatch=useDispatch();
  const currentUser=useSelector(store=>store.auth.currentUser);
  const handleLogout=async()=>{
    await axios.post("hhttps://adminpanelsystem.herokuapp.com/api/auth/logout");
    dispatch(logoutUser())
    navigate("/login");

  }
  return (
    <div className="user">
          <h1>User Management System</h1>
          <Dropdown>
            <Dropdown.Toggle className="toggle">
            <div className="currentUser">
            <img src={`data:image/svg+xml;base64,${currentUser.img}`} alt="" />
            <span>{currentUser.name}</span>
            <span>{currentUser.email}</span>
          </div>
            </Dropdown.Toggle>
         <Dropdown.Menu>
          <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
         </Dropdown.Menu>
          </Dropdown>
        </div>
  )
}

export default User;
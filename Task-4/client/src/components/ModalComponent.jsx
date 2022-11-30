import React from 'react'
import {Modal,Button} from "react-bootstrap"
import {makeRequest} from "../axios"
import {useQueryClient,useMutation} from "@tanstack/react-query"
import {useSelector,useDispatch} from "react-redux"
import { blockOrDeleteUser,logoutUser } from '../redux/users/actions'
import { useNavigate } from 'react-router-dom'



 const ModalComponent = ({modal,setModal}) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const currentUser=useSelector(store=>store.auth.currentUser);
const client=useQueryClient();

  const checkAuth=()=>{
      if(currentUser.status==="Blocked"||currentUser.status==="Deleted") {
        dispatch(logoutUser());
        navigate("/login");
        return true;
      }
  }
     
const BlockMutation=useMutation((ids)=>{
  if(checkAuth()) return;
  if(ids.includes(currentUser.id)) {
     dispatch(blockOrDeleteUser("Blocked"));
  }
    return makeRequest.put("/users/block",{ids});


},{
    onSuccess:()=>{
        client.invalidateQueries(["users"])
    }
})

const UnblockMutation=useMutation((ids)=>{
  if(checkAuth()) return;

    return makeRequest.put("/users/unblock",{ids})
},{
    onSuccess:()=>{
        client.invalidateQueries(["users"])
    }
})

const deleteMutation=useMutation((users)=>{
  if(checkAuth()) return;
  if(users.map(user=>user.id).includes(currentUser.id)) {
    dispatch(blockOrDeleteUser("Deleted"));
 }
      return makeRequest.delete("/users/delete",{data:{users}})
},{
  onSuccess:()=>{
    client.invalidateQueries(["users"])
  }
})

const handleBlock=async()=>{
    BlockMutation.mutate(modal.users.map(user=>user.id));
    setModal(null);
}
const handleUnBlock=async()=>{
    UnblockMutation.mutate(modal.users.map(user=>user.id));
    setModal(null);
}
const handleDelete=async()=>{
  deleteMutation.mutate(modal.users.map(user=>({id:user.id,email:user.email})));  
  setModal(null);
}
  return (
    <Modal show={modal} onHide={() => setModal(null)}>
    <Modal.Header closeButton>
      <Modal.Title>{modal.title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>{modal.message}</Modal.Body>
    <Modal.Footer>
      {modal.error && (
        <Button onClick={() => setModal(null)}>Got it!</Button>
      )}
      {modal.block && <Button onClick={handleBlock} variant="danger">Block</Button>}
      {modal.active && <Button onClick={handleUnBlock} variant="success">UnBlock</Button>}
      {modal.delete && <Button variant="danger" onClick={handleDelete}>Delete</Button>}
      {(modal.block || modal.active||modal.delete) && (
        <Button onClick={() => setModal(null)} variant="outlined">
          Cancel
        </Button>
      )}
      
    </Modal.Footer>
  </Modal>
  )
}

export default ModalComponent;
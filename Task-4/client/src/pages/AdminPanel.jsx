import React, { useEffect, useMemo, useState } from "react";
import { useTable, useRowSelect } from "react-table";
import { Table, ButtonGroup, Button} from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { CgUnblock } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";

import LoadingGif from "../assets/Loading.gif";
import { User, Checkbox, ModalComponent } from "../components";
import { COLUMNS } from "../utils/columns";
import {logoutUser} from "../redux/users/actions"


const AdminPanel = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const currentUser=useSelector(store=>store.auth.currentUser);

  const [modal, setModal] = useState(null);
  const { isLoading, data } = useQuery(
    ["users"],
    async () => {
      const res = await makeRequest.get("/users");
      if(res.data.every(user=>(user.status==="Blocked"))) {
        dispatch(logoutUser())
        navigate("/login");
      }

      return res.data;
    },
    { initialData: [] }
  );

  const memoizedData = useMemo(() => data, [data]);
  const columns = useMemo(() => COLUMNS, []);



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable({ columns, data: memoizedData }, useRowSelect, (hooks) =>
    hooks.visibleColumns.push((columns) => {
      return [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ];
    })
  );

  const isEmpty=rows=>{
    if(rows.length===0) {
      toast.error("No Users Selected",{autoClose:1000,position:"top-left"});
      return true;
    }else{
      return false;
    }

   
  }

  
const checkStatus=status=>{
  if(isEmpty(selectedFlatRows)) {
    return;
  };
   if(selectedFlatRows.some(user=>user.original.status===status)) {
    let message="";
      const users=selectedFlatRows.filter(user=>user.original.status===status).map(u=>u.original.id);
        message=(users.length===1 && selectedFlatRows.length===1 )? `This person is Already ${status}`:`Some of the selected user(s) Are already ${status}`
      setModal({title:"Error in selection",error:true,message})
   }else{
    let message;
    if(selectedFlatRows.find(user=>user.original.id===currentUser.id)) {
      message=`You ${selectedFlatRows.length>1?(selectedFlatRows.length>2?`And ${selectedFlatRows.length-1} Others`:`And ${selectedFlatRows.length-1} Other `):` `} Are about to be ${status}`
    }else{
        message=selectedFlatRows.length>1?`${selectedFlatRows.length} People are about to be ${status} `:`This person is about to be ${status}`
    }
    setModal({title:status==="Active"?"Activating Users":status==="Blocked"?"Blocking Users":"Deleting Users",block:status==="Blocked",active:status==="Active",delete:status==="Deleted",message,users:selectedFlatRows.map(u=>u.original)})
   }
}





  return (
    <div className="admin">
      <div className="wrapper">
        {modal && <ModalComponent modal={modal} setModal={setModal} />}

        <User />
        {isLoading ? (
          <div className="loading">
            <img src={LoadingGif} alt="" />
          </div>
        ) : (
          <div className="tableWrapper">
            <ButtonGroup size="lg" className="btnGroup">
              <Button onClick={()=>checkStatus("Blocked")} variant="danger">
                Block
              </Button>
              <Button onClick={()=>checkStatus("Active")} variant="link">
                <CgUnblock />
              </Button>
              <Button onClick={()=>checkStatus("Deleted")} variant="link">
                <AiFillDelete color="red" />
              </Button>
            </ButtonGroup>
            <Table responsive="md" bordered striped hover {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminPanel;

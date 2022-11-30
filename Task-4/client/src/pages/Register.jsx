import React,{useState} from 'react'
import {Form,Button, InputGroup,Modal} from "react-bootstrap"
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import {ImCross} from "react-icons/im"
import { useEffect } from 'react';
import {ToastContainer,toast} from "react-toastify"
import {Buffer} from "buffer"



const Register = () => {
    
    const navigate=useNavigate();
    const [inputs,setInputs]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const [isMatch,setIsMatch]=useState(true);
    const [errors,setErrors]=useState({});
    const [modal,setModal]=useState(null);

    useEffect(()=>{
        if(inputs.password!==inputs.confirmPassword&&(inputs.password!==""&&inputs.confirmPassword!=="")) {
            setIsMatch(false);
        }else{
            setIsMatch(true);
        }
    },[inputs.password,inputs.confirmPassword])

    
    

    

    const handleChange=e=>{
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    }
   
        const getAvatar=async()=>{
            const res=await axios.get(`https://api.multiavatar.com/45678945/${Math.round(Math.random()*1000)}`);
            const buffer=new Buffer(res.data);
            return buffer.toString("base64");
            
        };

    const handleRegister=async(e,arg)=>{
        e.preventDefault();
        try {
            const img=await getAvatar();
            const res=await axios.post(`https://adminpanelsystem.herokuapp.com/api/auth/${arg.reregister?'re':''}register`,{...inputs,img,arg});
            if(res.data.modal) {
                setModal(res.data.modal);
                return;
            }
            setModal(null);
            setInputs({ name:"",
            email:"",
            password:"",
            confirmPassword:""});
            setErrors({})
            setTimeout(()=>{
                navigate("/login");
                
            },3000);
            toast.success(res.data);
           
        }catch(err) {
            setErrors(err.response.data);
        }
        

    }
  return (
    <div className="register">
        <div className="wrapper">
        <h1>Register</h1>
        {modal && (
            <Modal show={modal} onHide={()=>setModal(null)}>
                <Modal.Header>
                    <Modal.Title>Re-register User</Modal.Title>
                   
                </Modal.Header>
                <Modal.Body>
                    {modal}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={(e)=>handleRegister(e,{reregister:true})}>Re-register</Button>
                    <Button variant="secondary" onClick={()=>setModal(null)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )}
        <Form>
        
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control isInvalid={errors.name}  name="name" value={inputs.name} onChange={handleChange} type="text" placeholder="Enter your name"/>
                {errors.name && <p className='error'>{errors.name}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control isInvalid={errors.email} name="email" value={inputs.email} onChange={handleChange} type="email" placeholder="Enter your E-mail"/>
                {errors.email && <p className='error'>{errors.email}</p>}
                <Form.Text>Your E-mail will never be shared to anyone</Form.Text>
                
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control isInvalid={errors.password} name="password" value={inputs.password} onChange={handleChange} type="password" placeholder="Enter your password"/>
                {errors.password && <p className='error'>{errors.password}</p>}
                <Form.Text>Suggestion: Use strong one</Form.Text>

            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup className="passwordInput">
                <Form.Control   isInvalid={errors.confirmPassword} name="confirmPassword" value={inputs.confirmPassword} onChange={handleChange} type="password" placeholder="Confirm your password"/>
                    {!isMatch && <span>
                     <ImCross className='icon'/>
                    </span>}
                </InputGroup>
                
                
                {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
                <Form.Text>Suggestion: Use strong one</Form.Text>
                
            </Form.Group>
            <Button onClick={(e)=>handleRegister(e,{reregister:false})} className="mb-2">Register</Button>
        </Form>
        <span>Already have an account? <Link to="/login">Login</Link> </span>
        </div>
        <ToastContainer/>
    </div>
  )
}



export default Register;



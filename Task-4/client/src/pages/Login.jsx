import React,{useState} from 'react'
import {Form,Button} from "react-bootstrap"
import {Link,useNavigate} from "react-router-dom"
import axios from "axios";
import {useDispatch} from "react-redux"
import { loginUser } from '../redux/users/actions';


const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({email:"",password:""});
  const [errors,setErrors]=useState({});

  const handleChange=e=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}));
  }

  const handleLogin=async()=>{
      try {
        const res=await axios.post("https://adminpanelsystem.herokuapp.com/api/auth/login",inputs,{withCredentials:true});
        dispatch(loginUser(res.data))
        navigate("/");

        
      }catch(err) {
        setErrors(err.response.data);
      }
  }
  return (
    <div className='login'>
        <div className="wrapper">
        <h1>Login</h1>
        <Form>
        
            
            <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control isInvalid={errors.email} onChange={handleChange} name="email" type="email" placeholder="Enter your E-mail"/>
                {errors.email && <p className='error'>{errors.email}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control isInvalid={errors.password} onChange={handleChange} name="password" type="password" placeholder="Enter your password"/>
                {errors.password && <p className='error'>{errors.password}</p>}
            </Form.Group>
            {errors.block && <p className='error'>{errors.block}</p>}
            <Button onClick={handleLogin} className="my-2">Login</Button>
        </Form>
        <span>Don't have an account? <Link to="/register">Register</Link> </span>
        </div>
    </div>
  )
}

export default Login;
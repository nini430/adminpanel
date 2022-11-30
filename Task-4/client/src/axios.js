import axios from "axios";


export const makeRequest=axios.create({baseURL:"https://adminpanelsystem.herokuapp.com/api",withCredentials:true});
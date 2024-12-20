import React, { useState } from 'react';
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from '../redux/userSlice';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);


    if (isLogin) {
      // login
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        });
        dispatch(getUser(res?.data?.user));
        if (res.data.success) {
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      // signup
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
          headers: {
            'Content-Type': "multipart/form-data"
          },
          withCredentials: true
        });
        if (res.data.success) {
          setIsLogin(true);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  }

  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-black'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div>
          <img className='ml-5' width={"350px"} src="https://i.postimg.cc/Z5KjBVKN/fflogo-2.jpg" alt="flutterfeed-logo" />
        </div>
        <div>
          <div className='my-1'>
            <img className='mr-5' width={"400px"} src="https://i.postimg.cc/kGB0pvPH/ff.jpg" alt="flutterfeed-logo" />
          </div>
          <h1 className='mt-4 mb-2 text-2xl text-white font-bold'>{isLogin ? "Login" : "Signup"}</h1>
          <form onSubmit={submitHandler} className='flex flex-col w-[60%]'>
            {!isLogin && (
              <>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className="outline-blue-500 text-black border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className="outline-blue-500 text-black border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
               
              </>
            )}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="outline-blue-500 text-black border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="outline-blue-500 text-black border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
            <button className='bg-[#d62965] border-none py-2 my-4 rounded-full text-lg text-white'>{isLogin ? "Login" : "Create Account"}</button>
            <h1 className='text-white'>{isLogin ? "Do not have an account?" : "Already have an account?"} <span onClick={loginSignupHandler} className='font-bold text-[#d62965] cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></h1>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;

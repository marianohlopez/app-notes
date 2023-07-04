import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import configParams from '../../config/config.js';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, password };
    try {
      const response = await axios.post(`${configParams.API_URL}/login`, userData);
      if(response.status === 200){
        alert("Login exitoso!")
        navigate('dashboard')
      }
      console.log(response.data); 
    } catch (error) {
      console.error(error);
      alert("Usuario inexistente")
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white sm:w-96 shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <Link to="/register" 
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Signup
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login

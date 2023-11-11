import React, { useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

function Login() {

    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!password || !username) {
            setLoading(false);
            return toast.error("All credentials are required");
        }

        try {
            const response = await login({
                password,
                username
            });

            toast.success(response.data);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className="bg-secondary w-[500px] h-[340px] p-4 rounded-md">
                <h2 className="text-2xl text-center">Login</h2>

                <form onSubmit={handleSubmit} className='mt-6'>
                    <div className='flex items-center my-4 bg-gray-900 py-1 rounded-md'>
                        <p className='h-[40px] text-center flex items-center justify-center p-2'><AiOutlineUser size={20} /></p>
                        <input value={username} onChange={e => setUserName(e.target.value)} className='w-11/12 py-2 px-1 bg-gray-900' type="text" placeholder='Username' />
                    </div>

                    <div className='flex items-center my-4 bg-gray-900 py-1 rounded-md'>
                        <p className='h-[40px] text-center flex items-center justify-center p-2'><RiLockPasswordFill size={20} /></p>
                        <input value={password} onChange={e => setPassword(e.target.value)} className='w-11/12 py-2 px-1 bg-gray-900' type="password" placeholder='Password' />
                    </div>

                    <div className='w-full flex items-center justify-center mt-6'>
                        <button disabled={loading} className={`${loading ? "" : "active:scale-75"} bg-green w-[80%] m-auto py-2 rounded-lg font-bold flex items-center justify-center drop-shadow-2xl duration-300`}>
                            {
                                loading ? 
                                <div className='animate-spin w-5 h-5 border-[2px] border-blue-600 rounded-full border-t-black mr-1'></div> : "Login"
                            }
                        </button>
                    </div>
                </form>

                <div className='text-end mt-2 text-xs'>
                    <p>Forgot password?</p>
                </div>

                <div className='text-center mt-4'>
                    <p>Don't have an account? 
                        <Link to='/signup' className='font-bold text-green ml-2'>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
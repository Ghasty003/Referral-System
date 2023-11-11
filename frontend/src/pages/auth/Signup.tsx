import React, { useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import useAuth from '../../hooks/useAuth';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [refCode, setRefCode] = useState("");
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password || !username) {
            setLoading(false);
            return toast.error("All credentials are required");
        }

        try {
            const response = await signup({
                email,
                password,
                ref_code: refCode,
                username
            });

            toast.success(response?.data.msg);
        } catch (error) {
            toast.error((error as AxiosError).response?.data as string);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className="bg-secondary w-[500px] h-[450px] p-4 rounded-md">
                <h2 className="text-2xl text-center">Sign up</h2>

                <form onSubmit={handleSubmit} className='mt-6'>
                    <div className='flex items-center my-4 bg-gray-900 py-1 rounded-md'>
                        <p className='h-[40px] text-center flex items-center justify-center p-2'><AiOutlineUser size={20} /></p>
                        <input value={username} onChange={e => setUserName(e.target.value)} className='w-11/12 py-2 px-1 bg-gray-900' type="text" placeholder='Username' />
                    </div>

                    <div className='flex items-center my-4 bg-gray-900 py-1 rounded-md'>
                        <p className='h-[40px] text-center flex items-center justify-center p-2'><MdOutlineAlternateEmail size={20} /></p>
                        <input value={email} onChange={e => setEmail(e.target.value)} className='w-11/12 py-2 px-1 bg-gray-900' type="email" placeholder='Email' />
                    </div>

                    <div className='flex items-center my-4 bg-gray-900 py-1 rounded-md'>
                        <p className='h-[40px] text-center flex items-center justify-center p-2'><RiLockPasswordFill size={20} /></p>
                        <input value={password} onChange={e => setPassword(e.target.value)} className='w-11/12 py-2 px-1 bg-gray-900' type="password" placeholder='Password' />
                    </div>

                    <div className='items-center rounded-md'>
                        <p className='text-xs mb-1'>Optional</p>
                        <input value={refCode} onChange={e => setRefCode(e.target.value)} className='w-full rounded py-2 px-3 bg-gray-900' type="text" placeholder='Referral code' />
                    </div>

                    <div className='w-full flex items-center justify-center mt-6'>
                        <button disabled={loading} className={`${loading ? "" : "active:scale-75"} bg-green w-[80%] m-auto py-2 rounded-lg font-bold flex items-center justify-center drop-shadow-2xl duration-300`}>
                            {
                                loading ? 
                                <div className='animate-spin w-5 h-5 border-[2px] border-blue-600 rounded-full border-t-black mr-1'></div> : "Register"
                            }
                        </button>
                    </div>
                </form>

                <div className='mt-4 text-center'>
                    <p>Already have an account? 
                        <Link to='/login' className='font-bold text-green ml-2'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
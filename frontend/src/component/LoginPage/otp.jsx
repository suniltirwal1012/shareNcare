import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';

function Otp() {
    const { mail } = useContext(UserContext); // Assuming UserContext provides the email
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            console.log('Submitting the form');
            const response = await axios.post('/api/v1/users/verify-otp', {
                email: mail,
                otp: otp
            });
            console.log('Response:', response);
            setMessage('Account has been created successfully.Please login to continue.');
            setError('');
            setIsLoading(false);
        } catch (err) {
            setError('Error verifying account. Please try again with different email id.');
            setMessage('');
            console.error('Error submitting the form:', err);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-auto p-6">
            <div className=" w-full flex flex-col gap-9">
                <div className="flex justify-center items-center">
                    <h1 className="text-4xl footer-title text-slate-800">OTP Verification</h1>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-8">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-xl font-mono">Email Id: </span>
                        </div>
                        <input
                            type="text"
                            name="email"
                            value={mail}
                            readOnly
                            placeholder="eg: johnsmith@mail.com"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-xl font-mono">OTP: </span>
                            <span className="label-text-alt">required</span>
                        </div>
                        <input
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={handleOtpChange}
                            placeholder="Enter your OTP"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>
                    <div className="flex justify-center">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center">
                                    <span className="loading loading-dots loading-sm mr-2"></span> Verifying...
                                </div>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {message && <p className="text-green-500">{message}</p>}
                </form>
                <div className="flex justify-center flex-wrap items-center gap-4">
                    <div>
                        <Link to="../login">
                            <p className="link link-hover text-blue-600">Go Back To Login Page</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Otp;

import { useState } from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
const PasswordList = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmNewPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    };

    const handleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const handleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleShowConfirmNewPassword = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword);
    };

    const handleSubmit = () => {
        if (newPassword !== confirmNewPassword) {
            alert("New password and confirm password do not match. Please try again.");
            return;
        }
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        alert('Password changed successfully!');
    };

    return (
        <div>
            <h1 className='text-center text-2xl font-bold mb-10'>Change Password</h1>
            <div className='w-1/2 mx-auto'>
                <div className='mb-4'>
                    <label htmlFor='currentPassword' className='block text-sm font-medium text-gray-600'>
                        Current Password
                    </label>
                    <div className='mt-1 relative rounded-md'>
                        <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            name='currentPassword'
                            id='currentPassword'
                            className='roudend-lg border-gray-300 focus:border-blue-500 focus:ring-blue-200 focus:ring-2'
                            style={{ width: '100%' }}
                            onChange={handleCurrentPasswordChange}
                        />
                        <div
                            className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                            onClick={handleShowCurrentPassword}
                        >
                            {showCurrentPassword ? (
                                <IoEyeOutline className='h-5 w-5 text-gray-500' />
                            ) : (
                                <IoEyeOffOutline className='h-5 w-5 text-gray-500' />
                            )}
                        </div>
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor='newPassword' className='block text-sm font-medium text-gray-600'>
                        New Password
                    </label>
                    <div className='mt-1 relative rounded-md'>
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            name='newPassword'
                            id='newPassword'
                            className='roudend-lg border-gray-300 focus:border-blue-500 focus:ring-blue-200 focus:ring-2'
                            style={{ width: '100%' }}
                            onChange={handleNewPasswordChange}
                        />
                        <div
                            className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                            onClick={handleShowNewPassword}
                        >
                            {showNewPassword ? (
                                <IoEyeOutline className='h-5 w-5 text-gray-500' />
                            ) : (
                                <IoEyeOffOutline className='h-5 w-5 text-gray-500' />
                            )}
                        </div>
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor='confirmNewPassword' className='block text-sm font-medium text-gray-600'>
                        Confirm New Password
                    </label>
                    <div className='mt-1 relative rounded-md'>
                        <input
                            type={showConfirmNewPassword ? 'text' : 'password'}
                            name='confirmNewPassword'
                            id='confirmNewPassword'
                            className='roudend-lg border-gray-300 focus:border-blue-500 focus:ring-blue-200 focus:ring-2'
                            style={{ width: '100%' }}
                            onChange={handleConfirmNewPasswordChange}
                        />
                        <div
                            className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                            onClick={handleShowConfirmNewPassword}
                        >
                            {showConfirmNewPassword ? (
                                <IoEyeOutline className='h-5 w-5 text-gray-500' />
                            ) : (
                                <IoEyeOffOutline className='h-5 w-5 text-gray-500' />
                            )}
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-center'>
                    <button
                        type='button'
                        onClick={handleSubmit}
                        className='btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordList;

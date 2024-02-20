import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { createFeedback } from '../../../utils/api/feedback';

const MemberFeedback = () => {
    const [loading, setLoading] = useState(false);
    const [infomation, setInfomation] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await createFeedback({ content: infomation });
            if (res.success) {
                setLoading(false);
                setInfomation('');
                toast.success('Send information successfully');
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    return (
        <div>
            <ToastContainer />
            <h1 className='text-center text-2xl font-bold mb-10'>Send information to administrator</h1>
            <div className='w-1/2 mx-auto'>
                <div className='mb-4'>
                    <label htmlFor='feedback' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        Information
                    </label>
                    <div className='mt-1 relative rounded-md'>
                        <textarea
                            name='feedback'
                            id='feedback'
                            value={infomation}
                            className='block w-full text-sm rounded-md border-0 py-2.5 px-4 bg-gray-500 text-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:leading-6'
                            style={{ width: '100%' }}
                            onChange={(e) => setInfomation(e.target.value)}
                            cols={30}
							rows={10}
                        />
                    </div>
                </div>
                <div className='mt-6 justify-center flex mb-10'>
                    <button
                        style={{
                            boxShadow:
                                '0px 16px 40px 0px rgba(237, 169, 44, 0.25);',
                        }}
                        className={`text-sm font-semibold py-3 px-16 rounded-full bg-yellow-500 text-white hover:text-yellow-100 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={(e) => handleSubmit(e)}
                        type='button'
                    >
                        {loading ? 'LOADING...' : 'SUBMIT'}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default MemberFeedback;

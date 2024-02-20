import { CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllFeedbackMember } from "../../../utils/api/feedback";

const MemberHistoryFeedback = () => {
    const { id } = useParams();
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectInfo, setSelectInfo] = useState('');
    const handlePageChange = (_e: any, page: number) => {
        setPage(page);
    };
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                setLoading(true);
				const response = await getAllFeedbackMember();
                setFeedbacks(response.data.data);
				console.log(feedbacks);
				
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFeedbacks();
    }, [id]);

    const showInfo = (id: number) => {
        setSelectInfo(feedbacks.find((feedback) => feedback.id === id).content);
        setShowModal(true);
    };
    
    return (
        <div>
            <h1 className='text-center text-2xl font-bold mb-10'>Sent information</h1>
            <div className='relative overflow-x-auto p-2'>
				<div className='pb-4 bg-white dark:bg-gray-900'>
					<label htmlFor='table-search' className='sr-only'>
						Search
					</label>
					<div className='relative mt-1'>
						<div className='absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none'>
							<svg
								className='w-4 h-4 text-gray-500 dark:text-gray-400'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 20 20'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
								/>
							</svg>
						</div>
						<input
							type='text'
							id='table-search'
							className='block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Search for items'
						/>
					</div>
				</div>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='p-4'>
								<div className='flex items-center'>
									<input
										id='checkbox-all-search'
										type='checkbox'
										className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
									/>
									<label
										htmlFor='checkbox-all-search'
										className='sr-only'
									>
										checkbox
									</label>
								</div>
							</th>
							<th scope='col' className='px-6 py-3'>
								Infomation
							</th>
							<th scope='col' className='px-6 py-3'>
								Sent At
							</th>
						</tr>
					</thead>
					<tbody>
						{feedbacks.length > 0 &&
							feedbacks?.map((feedback) => (
								<tr key={feedback.id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
									<td className='w-4 p-4'>
										<div className='flex items-center'>
											<input
												id='checkbox-table-search-1'
												type='checkbox'
												className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
											/>
											<label
												htmlFor='checkbox-table-search-1'
												className='sr-only'
											>
												checkbox
											</label>
										</div>
									</td>
									<td className='px-6 py-4'>
										<a className='cursor-pointer' onClick={() => showInfo(feedback.id)}> {feedback.content.length > 160 ? feedback.content?.slice(0, 160) + '...' : feedback.content} </a>
									</td>
									<td className='px-6 py-4'>{feedback.created?.slice(0, 10)}</td>
								</tr>
							))}
					</tbody>
				</table>
				{loading && (<div className='pt-20 w-full text-center'><CircularProgress size={20} sx={{color: '#00BFFF'}}/></div>)}

				<nav
					className='flex items-center flex-column flex-wrap md:flex-row justify-end pt-4'
					aria-label='Table navigation'
				>
					<Pagination
						count={totalPage}
						page={page}
						onChange={handlePageChange}
					></Pagination>
				</nav>
			</div>
            {showModal && (
                <div className='fixed z-10 inset-0 overflow-y-auto'>
                    <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
                            <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                        </div>
                        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
                            &#8203;
                        </span>
                        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full'>
                            <div className='bg-white dark:bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                <div className='sm:flex sm:items-start'>
                                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                        <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-200' id='modal-title'>
                                            Full infomation
                                        </h3>
                                        <div className='mt-2'>
                                            <p className='text-sm text-gray-500 dark:text-gray-400 max-h-96 overflow-auto'>
                                                {selectInfo}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                                <button
                                    type='button'
                                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-500 text-base font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm'
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
    };
export default MemberHistoryFeedback;

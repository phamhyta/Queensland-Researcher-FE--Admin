import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useReducer, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getAllEvents } from '../../../utils/api/events';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_SUCCESS':
			return {
				...state,
				events: action.payload.events,
				numOfPage: action.payload.total_pages,
				loading: false,
			};
		case 'FETCH_FAIL':
			return { ...state, loading: true, error: action.payload };
		default:
			return state;
	}
};


const EventsList = () => {
	const [{ loading, events, numOfPage }, dispatch] = useReducer(reducer, {
		loading: true,
		error: '',
	});
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const handleChangePage = (page) => {
		setCurrentPage(page)
	}
	useEffect(() => {
		const fetchData = async () => {
			const res = await getAllEvents(currentPage);
			if (res.success) {
				dispatch({
					type: 'FETCH_SUCCESS',
					payload: res.data,
				});
			} else {
				dispatch({
					type: 'FETCH_FAIL',
					payload: res.message,
				});
				toast.error(res.message);
			}
		};
		fetchData();
	}, [currentPage]);
	console.log(events, loading);
	const handleDelete = (id) => {
		console.log(id);
	};
	return (
		<>
			<ToastContainer />
			<h1 className='text-center'>List Events</h1>
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
								Title
							</th>
							<th scope='col' className='px-6 py-3'>
								Category
							</th>
							<th scope='col' className='px-6 py-3'>
								Create at
							</th>
							<th scope='col' className='px-6 py-3'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{events &&
							events.map((news) => (
								<tr key={news.id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
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
									<th
										scope='row'
										className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
									>
                                        <a href={`/admin/news/${news.id}`}>{news.title.length > 60 ? news.title.slice(0,50) + '...' : news.title}</a>
										
									</th>
									<td className='px-6 py-4'>{news.category}</td>
									<td className='px-6 py-4'>{news.createAt}</td>
									<td className='px-6 py-4'>
										<a
											href='#'
											onClick={() => navigate(`/admin/events/${news.id}`)}
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
										>
											<EditIcon />
										</a>
										<a
											href='#'
											onClick={() => {handleDelete(news.id)}}
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
										>
											<DeleteForeverIcon
												sx={{ color: 'red' }}
											/>
										</a>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				{numOfPage && (
					<div className='flex justify-center mt-5'>
						<Pagination
							count={numOfPage}
							page={currentPage}
							onChange={handleChangePage}
						></Pagination>
					</div>
				)}
			</div>
		</>
	);
};
export default EventsList;

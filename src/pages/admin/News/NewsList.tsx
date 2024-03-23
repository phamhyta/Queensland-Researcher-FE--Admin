import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress, IconButton, Pagination } from '@mui/material';
import { useStateValue } from '../../../context/StateProvider';
import { actionType } from '../../../context/reducer';
import { useState, useEffect } from 'react'
import { getNews, deleteNews } from '../../../utils/api';
import { LIMIT } from '../../../utils/constant';
import { useNavigate } from 'react-router-dom';

const NewsList = () => {
	const [newsList, setNewsList] = useState([])
	const [page, setPage] = useState(1)
	const [totalPage, setTotalPage] = useState(1)
	const [_, dispatch] = useStateValue();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetch = async () => {
			setLoading(true);
			const res = await getNews({ page, limit: LIMIT })
			if (res.success) {
				setNewsList(res.data.news)
				setTotalPage(res.data.total_pages)
			}
			setLoading(false);
		}
		fetch()
	}, [page])

	const handlePageChange = (_e: any, page: number) => {
		setPage(page);
	};

	const handleDeleteNews = (newsId, newsTitle) => {
		dispatch({
			type: actionType.SET_DIALOG,
			payload: {
				title: 'Confirm deletion',
				text: `Are you sure you want to delete the news "${newsTitle}" ? The data will be permanently deleted and cannot be recovered`,
				type: 'warning',
				handleOkClick: async () => {
					await onDeleteNews(newsId)
				},
				open: true,
			},
		});
		setOpenMenu(false);
	};

	const onDeleteNews = async (id) => {
		const res = await deleteNews(id)
		if (res.success)
			setNewsList(newsList.filter((f) => f.id !== id));
	}
	return (
		<>
			<h1 className='text-center'>List News</h1>
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
								Creator
							</th>
							<th scope='col' className='px-6 py-3'>
								Create At
							</th>
							<th scope='col' className='px-6 py-3'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{newsList &&
							newsList.map((news) => (
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
										<a className='cursor-pointer' onClick={() => navigate(`/admin/news/${news.id}`)}>{news.title.length > 60 ? news.title.slice(0, 50) + '...' : news.title}</a>

									</th>
									<td className='px-6 py-4'>{news.createBy || 'Admin'}</td>
									<td className='px-6 py-4'>{news.created_at.slice(0, 10)}</td>
									<td className='px-6 py-4'>
										<a
											onClick={() => navigate(`/admin/news/${news.id}`)}
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer'
										>
											<EditIcon />
										</a>
										<IconButton
											onClick={() => handleDeleteNews(news.id, news.title)}
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
										>
											<DeleteForeverIcon
												sx={{ color: 'red' }}
											/>
										</IconButton>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				{loading && (<div className='pt-20 w-full text-center'><CircularProgress size={20} sx={{color: '#00BFFF'}}/></div>)}

				<nav
					className='flex items-center flex-column flex-wrap md:flex-row justify-center pt-4'
					aria-label='Table navigation'
				>
					<Pagination
						count={totalPage}
						page={page}
						onChange={handlePageChange}
					></Pagination>
				</nav>
			</div>
		</>
	);
};
export default NewsList;

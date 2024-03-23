import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getContactById } from "../../../utils/api/contact";

const ContactDetail = () => {
	const [datas, setDatas] = useState('');
	const routeParams = useParams();
	useEffect(() => {
		const fetch = async () => {
			const res = await getContactById(routeParams.id)
			if (res.success) {
				setDatas(res.data)
			}
			console.log(res.data);
		}
		fetch()
	}, [routeParams.id])
	return (
		<>
			<h1 className='text-center'>Contact Detail</h1>
			<div className='mt-5'>
				<div className='mb-5'>
					<label
						htmlFor='news-title'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Name
					</label>
					<input
						type='text'
						id='news-title'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
                        disabled={true}
						value={datas.name}
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-title'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Email
					</label>
					<input
						type='text'
						id='news-title'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						disabled={true}
						value={datas.email}
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-title'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Phone
					</label>
					<input
						type='text'
						id='news-title'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						disabled={true}
						value={datas.phone}
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-title'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Message
					</label>
					<textarea
						id='news-title'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						disabled={true}
						value={datas.note}
						cols={30}
					></textarea>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-title'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Create at
					</label>
					<input
						type='text'
						id='news-title'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						disabled={true}
						value={datas.created_at}
					/>
				</div>
				{datas.file && (
					<div className='mb-5 flex items-center'>
						<label
							htmlFor='news-title'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Attached files
						</label>
						<div className='flex flex-wrap gap-2 ml-4'>
							<div className='flex gap-2'>
								<a
									href={datas.file}
									target='_blank'
									rel='noreferrer'
									className='text-blue-500 px-4 py-2 rounded-md border border-blue-500 cursor-pointer'
								>
									View file
								</a>
							</div>
						</div>
					</div>
				)}
				
			</div>
		</>
	);
};
export default ContactDetail;

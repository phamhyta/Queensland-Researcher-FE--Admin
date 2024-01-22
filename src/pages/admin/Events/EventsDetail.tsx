import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getAllEvents, getEventById } from '../../../utils/api/events';
import { BiImageAdd } from 'react-icons/bi';


const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_SUCCESS':
			return {
				...state,
				eventItem: action.payload,
				loading: false,
			};
		case 'FETCH_FAIL':
			return { ...state, loading: true, error: action.payload };
		case 'FETCH_UPDATE_EVENTS_REQUEST':
			return { ...state, loadingUpdate: true };
		case 'FETCH_UPDATE_EVENTS_SUCCESS':
			return {
				...state,
				listEvents: action.payload.events,
				loadingUpdate: false,
			};
		case 'FETCH_UPDATE_EVENTS_FAIL':
			return { ...state, loadingUpdate: true, error: action.payload };
		default:
			return state;
	}
};

const EventsDetail = () => {
	const [{ loading, eventItem, loadingUpdate, listEvents }, dispatch] = useReducer(reducer, {
		loading: true,
		loadingUpdate: true,
		error: '',
		eventItem: {
			title: '',
			overview: '',
			attendance: '',
			audience: [],
			category: '',
			image: '',
			program: '',
			purpose: [],
			when: '',
			where: '',
		},
	});
	const { id } = useParams();
	const [files, setFiles] = useState('');
	useEffect(() => {
		const fetchData = async () => {
			const res = await getEventById(id);
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
	}, [id]);
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const res = await getAllEvents();
	// 		if (res.success) {
	// 			dispatch({
	// 				type: 'FETCH_UPDATE_EVENTS_SUCCESS',
	// 				payload: res.data,
	// 			});
	// 		} else {
	// 			dispatch({
	// 				type: 'FETCH_UPDATE_EVENTS_FAIL',
	// 				payload: res.message,
	// 			});
	// 			toast.error(res.message);
	// 		}
	// 	};
	// 	fetchData();
	// }, []);

	const handleImageUpload = (e) => {
		if (!e.target.files) {
			return;
		}
		const item = e.target.files[0];
        item["img"] = URL.createObjectURL(item)
		setFiles(item);
	};
	return (
		<>
			<ToastContainer />
			<h1 className='text-center'>Chỉnh sửa tin tức</h1>
			<form className='mt-5'>
				<div className='mb-5'>
					<label
						htmlFor='news-title'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Title
					</label>
					<input
						type='text'
						id='news-title'
                        value={eventItem.title}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
						onChange={(e) => { eventItem.title = e.target.value }}
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-title'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Image
					</label>
					<div className='flex'>
						<div className='w-1/2 flex justify-center items-center text-[#646cff] font-bold cursor-pointer'>
							<BiImageAdd style={{color: '#646cff', fontSize: '20px',}} className='mr-2'/>Edit Image
							<input
								type='file'
								accept='image/*'
								hidden
								onChange={handleImageUpload}
							/>
						</div>
						<div><img src={eventItem.image} alt="" className='max-h-48'/></div>
					</div>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-content'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Overview
					</label>
					<Editor
						id='news-content'
						apiKey='up47n387bsvwk9o4t2c5am3dzhbh9nlmxkwfz50ldckxn3mm'
						initialValue={eventItem.overview}
						init={{
							height: 500,
							menubar: false,
							plugins: [
								'advlist',
								'autolink',
								'lists',
								'link',
								'image',
								'charmap',
								'preview',
								'anchor',
								'searchreplace',
								'visualblocks',
								'code',
								'fullscreen',
								'insertdatetime',
								'media',
								'table',
								'code',
								'help',
								'wordcount',
							],
							toolbar:
								'undo redo | blocks | ' +
								'bold italic forecolor | alignleft aligncenter ' +
								'alignright alignjustify | bullist numlist outdent indent | ' +
								'link image |' +
								'removeformat | help',
							content_style:
								'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
							file_picker_types: 'image',
							automatic_uploads: true,
							images_file_types: 'jpg,svg,webp',
							image_title: true,
						}}
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-title'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Attendance
					</label>
					<input
						type='text'
						id='news-title'
                        value={eventItem.attendance}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
						onChange={(e) => { eventItem.attendance = e.target.value }}
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-title'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Category
					</label>
					<input
						type='text'
						id='news-title'
                        value={eventItem.category}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
						onChange={(e) => { eventItem.category = e.target.value }}
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-title'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						When
					</label>
					<input
						type='text'
						id='news-title'
                        value={eventItem.when}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
						onChange={(e) => { eventItem.when = e.target.value }}
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-title'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Where
					</label>
					<input
						type='text'
						id='news-title'
                        value={eventItem.where}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
						onChange={(e) => { eventItem.where = e.target.value }}
						required
					/>
				</div>
				<div className='flex justify-center mt-10'>
					<button
						type='submit'
						className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
					>
						Cập nhật
					</button>
				</div>
			</form>
		</>
	);
};
export default EventsDetail;

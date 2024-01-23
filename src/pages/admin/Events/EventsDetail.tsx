import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { updateEvent, getEventById, createEvent } from '../../../utils/api/events';
import { uploadImage } from '../../../utils/api';
import { BiImageAdd } from 'react-icons/bi';
import { Button } from '@mui/material';

const EventsDetail = () => {
	const initialState = {
		title: '',
		overview: '',
		attendance: '',
		audience: '',
		category: '',
		image: '',
		program: '',
		purpose: '',
		when: '',
		where: '',
		eventDate: '',
	};
	const [eventItem, setEventItem] = useState(initialState);
	const { id } = useParams();
	useEffect(() => {
		if(id === undefined) {
			setEventItem(initialState);
			return;
		}
		const fetchData = async () => {
			const res = await getEventById(id);
			if (res.success) {
				setEventItem({...res.data, eventDate: res.data.eventDate.slice(0, 10)});
			} else {
				toast.error(res.message);
			}
		};
		fetchData();
	}, [id]);

	const handleImageUpload = async(e) => {
		if (!e.target.files) {
			return;
		}
		const res = await uploadImage(e.target.files[0]);
        if(res.success) {
			setEventItem({...eventItem, image: res.data.urls[0]});
        } else {
			toast.error("Networl error");
		}
	};

	const handelChangeInputForm = (e) => {
		setEventItem({ ...eventItem, [e.target.name]: e.target.value });
	}

	const handleUpdateEvent = async (e) => {
		e.preventDefault();
		const res = id === undefined ? await createEvent(eventItem) : await updateEvent(id, eventItem);
		if(res.success) {
			id === undefined ? toast.success("Create event success!") : toast.success("Update event success!");
			if (id === undefined) setEventItem(initialState);
		} else {
			toast.error(res.message);
		}
	}
	return (
		<>
			<ToastContainer />
			<h1 className='text-center'>{id === undefined ? 'Create' : 'Edit'} event</h1>
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
                        name='title'
						value={eventItem.title}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
						onChange={(e) => handelChangeInputForm(e)}
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-image'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Image
					</label>
					<div className='flex'>
						<div className='w-1/2 flex justify-center items-center text-[#646cff] font-bold cursor-pointer'>
							<Button component='label' fullWidth disableRipple className='hover:bg-neutral-200 rounded-md text-md hover:cursor-pointer'
								startIcon={<BiImageAdd style={{color: '#646cff', fontSize: '20px',}}/>}
								sx={{margin: 0, padding: 0, height: '100%', '&:hover': {backgroundColor: 'transparent',}, textTransform: 'none',}}
							>
								<div className='text-md text-[#646cff] font-semibold'>
								{id === undefined ? 'Upload' : 'Edit'} image
								</div>
								<input id='news-image' type='file' accept='image/*' hidden onChange={handleImageUpload}/>
							</Button>
						</div>
						<div><img src={eventItem.image} alt="" className='max-h-48'/></div>
					</div>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-overview'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Overview
					</label>
					<Editor
						id='news-overview'
						apiKey='up47n387bsvwk9o4t2c5am3dzhbh9nlmxkwfz50ldckxn3mm'
						initialValue={eventItem.overview}
						onChange={(e) => setEventItem({ ...eventItem, overview: e.target.getContent() })}
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
				<div>
					<label
						htmlFor='news-event-date'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Event date
					</label>
					<input
						type='date'
						id='news-event-date'
						name='eventDate'
						value={eventItem.eventDate.slice(0, 10)}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						onChange={(e) => handelChangeInputForm(e)}
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-attendance'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Attendance
					</label>
					<input
						type='text'
						id='news-attendance'
                        value={eventItem.attendance}
						name='attendance'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
						onChange={(e) => handelChangeInputForm(e)}
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-category'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Category
					</label>
					<input
						type='text'
						id='news-category'
                        value={eventItem.category}
						name='category'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
						onChange={(e) => handelChangeInputForm(e)}
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-when'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						When
					</label>
					<input
						type='text'
						id='news-when'
                        value={eventItem.when}
						name='when'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
						onChange={(e) => handelChangeInputForm(e)}
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-where'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Where
					</label>
					<input
						type='text'
						id='news-where'
                        name='where'
						value={eventItem.where}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
						onChange={(e) => handelChangeInputForm(e)}
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-purpose'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Purpose
					</label>
					<input
						type='text'
						id='news-purpose'
                        name='purpose'
						value={eventItem.purpose}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
						onChange={(e) => handelChangeInputForm(e)}
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-audience'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Audience
					</label>
					<input
						type='text'
						id='news-audience'
						name='audience'
						value={eventItem.audience}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
						onChange={(e) => handelChangeInputForm(e)}
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-program'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Program
					</label>
					<input
						type='text'
						id='news-program'
						name='program'
						value={eventItem.program}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
						onChange={(e) => handelChangeInputForm(e)}
						required
					/>
				</div>
				<div className='flex justify-center mt-10'>
					<button
						onClick={handleUpdateEvent}
						className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
					>
						{id === undefined ? 'Create' : 'Update'}
					</button>
				</div>
			</form>
		</>
	);
};
export default EventsDetail;
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
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
	const [uploading, setUploading] = useState(false);
	const { id } = useParams();
	const editorRef = useRef(null);

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
		try {
			setUploading(true);
			const res = await uploadImage(e.target.files[0]);
			console.log(res);
			
			if(res.success) {
				setEventItem({...eventItem, image: res.data.data[0].url});
			} else {
				toast.error("Networl error");
			}
			setUploading(false);
		} catch (error) {
			setUploading(false);
			toast.error("Networl error");
		}
	};

	const handelChangeInputForm = (e) => {
		setEventItem({ ...eventItem, [e.target.name]: e.target.value });
	}

	const handleUpdateEvent = async (e) => {
		e.preventDefault();
		console.log(eventItem);
		
		const res = id === undefined ? await createEvent(eventItem) : await updateEvent(id, eventItem);
		if(res.success) {
			id === undefined ? toast.success("Create event success!") : toast.success("Update event success!");
			if (id === undefined) setEventItem(initialState);
		} else {
			toast.error(res.message);
		}
	}

	const handelChangeInputForm2 = (e: any, index: number) => {
		const arr = eventItem[e.target.name].split("\\n");
		arr[index] = e.target.value;
		setEventItem({ ...eventItem, [e.target.name]: arr.join("\\n") });
	}

	const addInput = (nameInput: string) => {
		setEventItem({ ...eventItem, [nameInput]: eventItem[nameInput] + "\\n" });
	}

	const deleteInput = (nameInput: string, index: number, e) => {
		e.preventDefault();
		const arr = eventItem[nameInput].split("\\n");
		arr.splice(index, 1);
		setEventItem({ ...eventItem, [nameInput]: arr.join("\\n") });
	}

	const handelChangeTime1 = (e: any, index: number) => {
		const arr = eventItem.program.split("\\n");
		arr[index] = e.target.value + ' - ' + arr[index].slice(8);
		setEventItem({ ...eventItem, program: arr.join("\\n") });
	}

	const handelChangeTime2 = (e: any, index: number) => {
		const arr = eventItem.program.split("\\n");
		arr[index] = arr[index].slice(0, 8) + e.target.value + arr[index].slice(13);
		setEventItem({ ...eventItem, program: arr.join("\\n") });
	}

	const handelChangeTime3 = (e: any, index: number) => {
		const arr = eventItem.program.split("\\n");
		arr[index] = arr[index].slice(0, 13) + ' ' + e.target.value;
		setEventItem({ ...eventItem, program: arr.join("\\n") });
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
						placeholder='New title ...'
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
								{uploading ? 'Uploading image...' : <>{id === undefined ? 'Upload' : 'Edit'} image</>}
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
						onInit={(evt, editor) => editorRef.current = editor}
						id='news-overview'
						apiKey='up47n387bsvwk9o4t2c5am3dzhbh9nlmxkwfz50ldckxn3mm'
						// initialValue='<p>This is the initial content</p>'
						value={eventItem.overview}
						onEditorChange={() => setEventItem({ ...eventItem, overview: editorRef.current?.getContent() })}
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
						placeholder='Attendance ...'
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
						placeholder='Category ...'
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
						placeholder='When ...'
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
						placeholder='Where ...'
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
					{eventItem.purpose.split("\\n").map((item, index) => {
						return <div className='flex'>
							<input 
								key={index}
								type='text'
								id='news-purpose'
								name='purpose'
								value={item}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='Purpose ...'
								onChange={(e) => handelChangeInputForm2(e, index)}
								required
							/>
							<button className='ml-2 mt-2 bg-red-600 text-white' onClick={(e) => deleteInput('purpose', index, e)}>Delete</button>
						</div>;
					})}
					<button type='button' className='mt-2 border border-white' onClick={() => addInput("purpose")}>Add purpose</button>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-audience'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Audience
					</label>
					{eventItem.audience.split("\\n").map((item, index) => {
						return <div className='flex'>
							<input 
								key={index}
								type='text'
								id='news-audience'
								name='audience'
								value={item}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='Audience ...'
								onChange={(e) => handelChangeInputForm2(e, index)}
								required
							/>
							<button className='ml-2 mt-2 bg-red-600 text-white' onClick={(e) => deleteInput('audience', index, e)}>Delete</button>
						</div>;
					})}
					<button type='button' className='mt-2 border border-white' onClick={() => addInput("audience")}>Add audience</button>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-program'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Program
					</label>
					{eventItem.program.split("\\n").map((item, index) => {
						return <div className='flex'>
							<div className='flex w-11/12'>
								<input 
									type='time'
									pattern="[0-9]{2}:[0-9]{2}"
									id='news-program'
									name='program'
									value={item.slice(0, 5)}
									className='bg-gray-50 w-1/6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mt-2 ml-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='Program ...'
									onChange={(e) => handelChangeTime1(e, index)}
									required
								/>
								<input 
									type='time'
									pattern="[0-9]{2}:[0-9]{2}"
									id='news-program'
									name='program'
									value={item.slice(8, 13)}
									className='bg-gray-50 w-1/6 border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mt-2 ml-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='Program ...'
									onChange={(e) => handelChangeTime2(e, index)}
									required
								/>
								<input 
									type='text'
									id='news-program'
									name='program'
									value={item.slice(14)}
									className='bg-gray-50 w-2/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mt-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='Program ...'
									onChange={(e) => handelChangeTime3(e, index)}
									required
								/>
							</div>
							<button className='ml-2 mt-2 bg-red-600 text-white' onClick={(e) => deleteInput('program', index, e)}>Delete</button>
						</div>;
					})}
					<button type='button' className='mt-2 border border-white' onClick={() => addInput("program")}>Add program</button>
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

import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { createNews } from '../../../utils/api';
import { uploadImage } from '../../../utils/api';
import { BiImageAdd } from 'react-icons/bi';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

const CreateNews = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);
	const [thumbnail, setThumbnail] = useState("");
	const [uploading, setUploading] = useState(false);

	const navigate = useNavigate();

	const handleOnSubmit = async () => {
		setLoading(true)
		const res = await createNews({
			title,
			content,
			image: thumbnail
		})
		if (res.success)
			navigate('/admin/news');
		setLoading(false)
	}

	const handleImageUpload = async(e) => {
		if (!e.target.files) {
			return;
		}
		try {
			setUploading(true);
			const res = await uploadImage(e.target.files[0]);
			console.log(res);
			
			if(res.success) {
				setThumbnail(res.data.data[0].url);
			} else {
				toast.error("Networl error");
			}
			setUploading(false);
		} catch (error) {
			setUploading(false);
			toast.error("Networl error");
		}
	};
	return (
		<>
			<h1 className='text-center'>Create new news</h1>
			<div className='mt-5'>
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
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
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
								{uploading ? 'Uploading image...' : <> Update image</>}
								</div>
								<input id='news-image' type='file' accept='image/*' hidden onChange={handleImageUpload}/>
							</Button>
						</div>
						<div>{thumbnail != '' && <img src={thumbnail} alt="" className='max-h-48'/>}</div>
					</div>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-content'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Content
					</label>
					<Editor
						id='news-content'
						// apiKey='up47n387bsvwk9o4t2c5am3dzhbh9nlmxkwfz50ldckxn3mm'
						apiKey='125forgcd7noj9j97bmqpayn4dmt8r5x6ezdb7302c9x8c5k'
						initialValue='<p>This is the initial content</p>'
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
						value={content}
						onEditorChange={(content) => setContent(content)}
					/>
				</div>
				<div className='flex justify-center mt-10'>
					<button
						onClick={handleOnSubmit}
						className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
					>
						{loading ? <CircularProgress size={20} sx={{ color: '#ffffff' }} /> : 'Create'}
					</button>
				</div>
			</div>
		</>
	);
};

export default CreateNews;

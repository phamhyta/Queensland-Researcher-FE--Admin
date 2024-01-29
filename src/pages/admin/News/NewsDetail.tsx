import { Editor } from '@tinymce/tinymce-react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { getNewsDetail, updateNews } from '../../../utils/api';

const NewsDetail = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);
	const [thumbnail, setThumbnail] = useState("");
	const routeParams = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		const fetch = async () => {
			const res = await getNewsDetail(routeParams.id)
			if (res.success) {
				setTitle(res.data.title)
				setContent(res.data.content)
				setThumbnail(res.data.image)
			}
		}
		fetch()
	}, [routeParams.id])

	const handleOnSubmit = async () => {
		setLoading(true)
		const res = await updateNews({
			id: routeParams.id,
			title,
			content,
			image: thumbnail
		})
		if (res.success)
			navigate('/admin/news');
		setLoading(false)
	}
	return (
		<>
			<h1 className='text-center'>Edit news</h1>
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
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
						required
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-title'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Thumbnail
					</label>
					<input
						type='text'
						id='news-title'
						value={thumbnail}
						onChange={(e) => setThumbnail(e.target.value)}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Thumbnail ...'
						required
					/>
				</div>
				<div className='mb-5'>
					<p
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Preview
					</p>
					{thumbnail != '' && <img src={thumbnail} className="h-40" />}
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
						apiKey='up47n387bsvwk9o4t2c5am3dzhbh9nlmxkwfz50ldckxn3mm'
						// initialValue='<p>This is the initial content</p>'
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
						{loading ? <CircularProgress size={20} sx={{ color: '#ffffff' }} /> : 'Update'}
					</button>
				</div>
			</div>
		</>
	);
};
export default NewsDetail;

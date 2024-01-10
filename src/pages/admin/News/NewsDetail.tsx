import { Editor } from '@tinymce/tinymce-react';

const NewsDetail = () => {
	return (
		<>
			<h1 className='text-center'>Chỉnh sửa tin tức</h1>
			<form className='mt-5'>
				<div className='mb-5'>
					<label
						htmlFor='news-title'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Tiêu đề
					</label>
					<input
						type='text'
						id='news-title'
                        value="Mừng Lễ Giáng sinh và Năm mới! Thông điệp từ Ban Điều hành"
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Tiêu đề tin tức ...'
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='news-content'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Nội dung
					</label>
					<Editor
						id='news-content'
						apiKey='up47n387bsvwk9o4t2c5am3dzhbh9nlmxkwfz50ldckxn3mm'
						// onInit={(evt, editor) => (editorRef.current = editor)}
						initialValue='<p>Năm 2023 sắp kết thúc, Ban Điều hành VASEA xin gửi những lời chúc tốt đẹp nhất tới tất cả hội viên VASEA và gia đình. Cầu mong năm mới mang đến cho các hội viên và gia đình sức khỏe, hạnh phúc và thành công trong cả nỗ lực cá nhân và nghề nghiệp.
Năm 2023 là một năm bản lề đối với VASEA. Ở cấp độ quản trị, VASEA đã chính thức thành lập như một tổ chức với tất cả sự công nhận và trách nhiệm được Ủy ban Chứng khoán & Đầu tư Úc công nhận và quản lý. Vào ngày 10 tháng 8 năm 2023, VASEA chính thức được giới thiệu tới công chúng bằng lễ ra mắt chính thức. Hơn 120 thành viên và khách mời đã trực tiếp tham dự sự kiện ra mắt ở Melbourne, nhiều người trong số họ đang di chuyển giữa các tiểu bang. Nhiều người khác cũng tham gia sự kiện này thông qua nền tảng trực tuyến từ Việt Nam, Nhật Bản, Châu Âu và các nơi khác trên thế giới. Tại buổi ra mắt, VASEA đã nhận được tin nhắn chúc mừng và lời động viên từ các quan chức chính phủ của cả Australia và Việt Nam.</p>'
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
export default NewsDetail;

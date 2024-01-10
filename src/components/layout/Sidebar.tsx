const Sidebar = () => {
	return (
		<>
			<aside
				id='sidebar-multi-level-sidebar'
				className='fixed top-0 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0'
				aria-label='Sidebar'
			>
				<div className='h-full px-3 py-6 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
					<a href='#' className='flex items-center ps-2.5 mb-5'>
						<img
							src='https://vasea.org.au/wp-content/uploads/2023/07/z4514410384541_dfbb72ef99454483fbfb6f19314dce7f.jpg'
							className='h-6 me-3 sm:h-7'
							alt='VASEA Logo'
						/>
						<span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
							VASEA Admin
						</span>
					</a>
					<ul className='space-y-2 font-medium'>
						<li>
							<a
								href='/admin/dashboard'
								className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
							>
								<svg
									className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 22 21'
								>
									<path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
									<path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
								</svg>
								<span className='ms-3'>Dashboard</span>
							</a>
						</li>
						<li>
							<button
								type='button'
								className='flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
								aria-controls='dropdown-example'
								data-target='dropdown-example'
								data-collapse-toggle='dropdown-example'
							>
								<svg
									className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 16 20'
								>
									<path d='M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z' />
								</svg>
								<span className='flex-1 ms-3 text-left rtl:text-right whitespace-nowrap'>
									Tin tức
								</span>
								<svg
									className='w-3 h-3'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 10 6'
								>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='m1 1 4 4 4-4'
									/>
								</svg>
							</button>
							<ul
								id='dropdown-example'
								className='hidden py-2 space-y-2'
							>
								<li>
									<a
										href='/admin/news'
										className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
									>
										Danh sách tin tức
									</a>
								</li>
								<li>
									<a
										href='/admin/news/create-news'
										className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
									>
										Tạo mới tin tức
									</a>
								</li>
							</ul>
						</li>
                        <li>
							<button
								type='button'
								className='flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
								aria-controls='dropdown-event'
								data-collapse-toggle='dropdown-event'
							>
								<svg
									className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 17 20'
								>
									<path d='M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z' />
								</svg>
								<span className='flex-1 ms-3 text-left rtl:text-right whitespace-nowrap'>
									Sự kiện
                                </span>
								<svg
									className='w-3 h-3'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 10 6'
								>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='m1 1 4 4 4-4'
									/>
								</svg>
							</button>
							<ul
								id='dropdown-event'
								className='hidden py-2 space-y-2'
							>
								<li>
									<a
										href='#'
										className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
									>
										Danh sách sự kiện
									</a>
								</li>
								<li>
									<a
										href='#'
										className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
									>
										Tạo mới sự kiện
									</a>
								</li>
							</ul>
						</li>
                        <li>
							<button
								type='button'
								className='flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
								aria-controls='dropdown-user'
								data-collapse-toggle='dropdown-user'
							>
								<svg
									className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 20 18'
								>
									<path d='M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z' />
								</svg>
								<span className='flex-1 ms-3 text-left rtl:text-right whitespace-nowrap'>
									Thành viên
                                </span>
								<svg
									className='w-3 h-3'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 10 6'
								>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='m1 1 4 4 4-4'
									/>
								</svg>
							</button>
							<ul
								id='dropdown-user'
								className='hidden py-2 space-y-2'
							>
								<li>
									<a
										href='/admin/members'
										className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
									>
										Danh sách thành viên
									</a>
								</li>
								<li>
									<a
										href='/admin/members'
										className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
									>
										Duyệt thành viên
                                        <span className='inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300'>
                                            3
                                        </span>
									</a>
								</li>
							</ul>
						</li>
						<li>
							<a
								href='#'
								className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
							>
								<svg
									className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 18 16'
								>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3'
									/>
								</svg>
								<span className='flex-1 ms-3 whitespace-nowrap'>
									Đăng xuất
								</span>
							</a>
						</li>
					</ul>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;


const Pagination = ({ currentPage, numOfPage, onChangePage }) => {
	return (
		<>
			<div className='inline-flex' aria-label='Pagination'>
				<button
					disabled={currentPage === 1}
					onClick={() => onChangePage(currentPage - 1)}
					className='bg-gray-800 w-10 h-10 p-2.5 relative inline-flex justify-center rounded-lg items-center text-darkGray ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 mr-2'
				>
					<span className='sr-only'>Previous</span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='9'
						height='18'
						viewBox='0 0 9 18'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M8.37799 17.7803C8.67088 17.4874 8.67088 17.0126 8.37799 16.7197L1.85799 10.1997C1.38088 9.72256 1.38088 8.93744 1.85799 8.46033L8.37799 1.94033C8.67088 1.64744 8.67088 1.17256 8.37799 0.879669C8.08509 0.586777 7.61022 0.586777 7.31733 0.879669L0.797326 7.39967C-0.265567 8.46256 -0.265567 10.1974 0.797326 11.2603L7.31733 17.7803C7.61022 18.0732 8.08509 18.0732 8.37799 17.7803Z'
							fill='#C4C4C4'
						/>
					</svg>
				</button>
				{[...new Array(numOfPage)].map((item, index) => (
					<button
						key={index}
						disabled={index + 1 === currentPage}
						onClick={() => onChangePage(index + 1)}
						className={`w-10 h-10 p-2.5 rounded-lg mr-2 justify-center relative z-10 inline-flex items-center text-sm font-semibold text-white disabled:text-gray-400 bg-gray-800 border border-[#E4E4E4] hover:bg-gray-50 ${
							index + 1 === currentPage ? ' app-gradient' : ''
						}`}
					>
						{index + 1}
					</button>
				))}
				<button
					onClick={() => onChangePage(currentPage + 1)}
					disabled={currentPage === numOfPage}
					className='bg-gray-800 w-10 h-10 p-2.5 relative inline-flex justify-center rounded-lg items-center text-darkGray ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 mr-2'
				>
					<span className='sr-only'>Next</span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='9'
						height='18'
						viewBox='0 0 9 18'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M0.21967 17.7803C-0.0732233 17.4874 -0.0732234 17.0126 0.21967 16.7197L6.73967 10.1997C7.21678 9.72256 7.21678 8.93744 6.73967 8.46033L0.219669 1.94033C-0.073224 1.64744 -0.073224 1.17256 0.219669 0.879669C0.512562 0.586777 0.987436 0.586777 1.28033 0.879669L7.80033 7.39967C8.86322 8.46256 8.86322 10.1974 7.80033 11.2603L1.28033 17.7803C0.987437 18.0732 0.512563 18.0732 0.21967 17.7803Z'
							fill='#C4C4C4'
						/>
					</svg>
				</button>
			</div>
		</>
	);
};
export default Pagination;

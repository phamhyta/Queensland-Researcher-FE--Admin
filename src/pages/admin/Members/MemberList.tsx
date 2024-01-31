import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { getListMembers, deleteMember, exportMember } from '../../../utils/api';
import { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import { useStateValue } from '../../../context/StateProvider';
import { actionType } from '../../../context/reducer';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
const MemberList = () => {
	const [members, setMembers] = useState([]);
	// thêm tạm pagination trong lúc chưa viết api chờ demo
	const [currentPage, setCurrentPage] = useState(1);
	const [membersPerPage] = useState(8);
	// 
	const [_, dispatch] = useStateValue();
	const navigate = useNavigate();
	useEffect(() => {
		const fetch = async () => {
			const res = await getListMembers()
			if (res.success) {
				setMembers(res.data);
			}
		}
		fetch()
	}, [])

	// thêm tạm pagination trong lúc chưa viết api chờ demo
	const indexOfLastMember = currentPage * membersPerPage;
	const indexOfFirstMember = indexOfLastMember - membersPerPage;
	const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	//
	const handleOnClickDelete = (id: number) => {
		dispatch({
			type: actionType.SET_DIALOG,
			payload: {
				title: 'Confirm deletion',
				text: 'Are you sure you want to delete this member? The data will be permanently deleted and cannot be recovered.',
				type: 'warning',
				handleOkClick: async () => {
					const res = await deleteMember(id)
					if (res.success) {
						toast.success("Deleted successfully ", {
							position: 'top-right',
							autoClose: 2000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: false,
							draggable: true,
							progress: undefined,
							theme: 'light',
						});
						setMembers(members.filter((f) => f.id != id));
					} else {
						toast.error("Delete failed ", {
							position: 'top-right',
							autoClose: 2000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: false,
							draggable: true,
							progress: undefined,
							theme: 'light',
						});
					}
				},
				open: true,
			},
		});
	}
	const handleOnClickDownload = async () => {
		console.log('download');
		try {
			const response = await exportMember();
			if (response.success) {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'members.csv');
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			} else {
				console.error('Download failed!');
			}
		} catch (error) {
			console.error('Download failed: ', error);
		}
	};
	return (
		<>
			<ToastContainer />
			<h1 className='text-center'>List Members</h1>
			<div className='relative overflow-x-auto p-2'>
				<div className='pb-4 bg-white dark:bg-gray-900'>
					<label htmlFor='table-search' className='sr-only'>
						Search
					</label>
					<div className='relative mt-1 flex items-center justify-between'>
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
						<div className='flex items-center'>
							<p className='pr-2'>Download CSV</p>
							<button onClick={handleOnClickDownload}><FileDownloadOutlinedIcon /></button>
						</div>
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
								Name
							</th>
							<th scope='col' className='px-6 py-3'>
								Email
							</th>
							<th scope='col' className='px-6 py-3'>
								Organization
							</th>
							<th scope='col' className='px-6 py-3'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{/* {members &&
							members.map((member, index) => ( */}
						{currentMembers &&
							currentMembers.map((member, index) => (
								<tr
									key={index}
									className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
								>
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
										<a onClick={() => navigate(`/admin/members/${member?.id}`)}>
											{member.name}
										</a>
									</th>
									<td className='px-6 py-4'>
										{member.email}
									</td>
									<td className='px-6 py-4'>
										{member.organization}
									</td>
									<td className='px-6 py-4'>
										<a
											onClick={() => navigate(`/admin/members/${member?.id}`)}
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
										>
											<EditIcon />
										</a>
										<IconButton
											onClick={() => handleOnClickDelete(member.id)}
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
				<div className='flex justify-center items-center mt-4'>
					<ul className='pagination' style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
						{Array.from({ length: Math.ceil(members.length / membersPerPage) }).map((_, index) => (
							<li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} style={{ margin: '0 5px' }}>
								<button className='page-link' onClick={() => paginate(index + 1)}>
									{index + 1}
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default MemberList;

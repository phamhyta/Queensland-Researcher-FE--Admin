import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddTaskSharpIcon from '@mui/icons-material/AddTaskSharp';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { getListRegistration, deleteRegistration, acceptMember } from '../../../utils/api';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../../context/StateProvider';
import { actionType } from '../../../context/reducer';
import { ToastContainer, toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const MemberPendingList = () => {
	const [members, setMembers] = useState([]);
	const navigate = useNavigate();
	const [_, dispatch] = useStateValue();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetch = async () => {
			setLoading(true);
			const res = await getListRegistration()
			if (res.success) {
				setMembers(res.data)
			}
			setLoading(false);
		}
		fetch()
	}, [])

	const handleOnClickDelete = (id: number) => {
		dispatch({
			type: actionType.SET_DIALOG,
			payload: {
				title: 'Confirm deletion',
				text: 'Are you sure you want to delete this member? The data will be permanently deleted and cannot be recovered.',
				type: 'warning',
				handleOkClick: async () => {
					const res = await deleteRegistration(id)
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

	const handleAccept = (id: number) => {
		dispatch({
			type: actionType.SET_DIALOG,
			payload: {
				title: 'Confirm accept',
				text: 'Are you sure you want to accept this member?',
				type: 'warning',
				handleOkClick: async () => {
					const res = await acceptMember(id)
					if (res.success) {
						toast.success("Accept successfully ", {
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
						toast.error("Accept failed ", {
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
	return (
		<>
			<ToastContainer />
			<h1 className='text-center'>List pending review</h1>
			<div className='relative overflow-x-auto p-2'>
				<div className='pb-4 bg-white dark:bg-gray-900'>
					<label htmlFor='table-search' className='sr-only'>
						Search
					</label>
					<div className='relative mt-1'>
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
								Expertise
							</th>
							<th scope='col' className='px-6 py-3'>
								Address
							</th>
							<th scope='col' className='px-6 py-3'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{members &&
							members.map((member, index) => (
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
										<a href={`/admin/members-pending/${member.id}`}>
											{member.name}
										</a>
									</th>
									<td className='px-6 py-4'>
										{member.email}
									</td>
									<td className='px-6 py-4'>
										{member.expertise}
									</td>
									<td className='px-6 py-4'>
										{member.address}
									</td>
									<td className='px-6 py-4 flex'>
										<div
											onClick={() => navigate(`/admin/members-pending/${member.id}`)}
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2 cursor-pointer'
										>
											<RemoveRedEyeIcon />
										</div>
										<div
											onClick={() => handleAccept(member.id)}
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2 cursor-pointer'
										>
											<AddTaskSharpIcon />
										</div>
										<div
											onClick={() => handleOnClickDelete(member.id)}
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer'
										>
											<DeleteForeverIcon
												sx={{ color: 'red' }}
											/>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				{loading && (<div className='pt-20 w-full text-center'><CircularProgress size={20} sx={{color: '#ffffff'}}/></div>)}
			</div>
		</>
	);
};
export default MemberPendingList;

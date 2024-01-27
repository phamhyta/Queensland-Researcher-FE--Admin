import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { faker } from '@faker-js/faker';
import { getListRegistration } from '../../../utils/api';
import { useEffect ,useState} from 'react'

const memberListMock = faker.helpers.multiple(
	() => {
		return {
			id: faker.string.uuid(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            name: faker.internet.userName(),
            yearOfBirth: faker.date.past().getFullYear(),
            phoneNumber: faker.phone.number(),
            address: faker.location.streetAddress(),
            expertise: faker.person.jobTitle(),
            highestDegree: "PhD",
            professionalLink: faker.internet.url()
		};
	},
	{
		count: 10,
	},
);

const MemberPendingList = () => {
    const [members, setMembers] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const res = await getListRegistration()
            if(res.success) {
                setMembers(res.data)
            }
        }
        fetch()
    }, [])
	return (
		<>
			<h1 className='text-center'>Danh sách đang chờ xét duyệt</h1>
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
								Tên
							</th>
							<th scope='col' className='px-6 py-3'>
								Email
							</th>
							<th scope='col' className='px-6 py-3'>
								Số điện thoại
							</th>
                            <th scope='col' className='px-6 py-3'>
								Chuyên môn
							</th>
                            <th scope='col' className='px-6 py-3'>
								Địa chỉ
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
										<a href={`/admin/members/${member.id}`}>
											{member.name}
										</a>
									</th>
									<td className='px-6 py-4'>
										{member.email}
									</td>
									<td className='px-6 py-4'>
										{member.phoneNumber}
									</td>
                                    <td className='px-6 py-4'>
										{member.expertise}
									</td>
                                    <td className='px-6 py-4'>
										{member.address}
									</td>
									<td className='px-6 py-4'>
										<a
											href='#'
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
										>
											<RemoveRedEyeIcon />
										</a>
                                        <a
											href='#'
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
										>
											<ThumbUpIcon />
										</a>
										<a
											href='#'
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
										>
											<DeleteForeverIcon
												sx={{ color: 'red' }}
											/>
										</a>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				<nav
					className='flex items-center flex-column flex-wrap md:flex-row justify-between pt-4'
					aria-label='Table navigation'
				>
					<span className='text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto'>
						Showing{' '}
						<span className='font-semibold text-gray-900 dark:text-white'>
							1-10
						</span>{' '}
						of{' '}
						<span className='font-semibold text-gray-900 dark:text-white'>
							1000
						</span>
					</span>
					<ul className='inline-flex -space-x-px rtl:space-x-reverse text-sm h-8'>
						<li>
							<a
								href='#'
								className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
							>
								Previous
							</a>
						</li>
						<li>
							<a
								href='#'
								className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
							>
								1
							</a>
						</li>
						<li>
							<a
								href='#'
								className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
							>
								2
							</a>
						</li>
						<li>
							<a
								href='#'
								aria-current='page'
								className='flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
							>
								3
							</a>
						</li>
						<li>
							<a
								href='#'
								className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
							>
								4
							</a>
						</li>
						<li>
							<a
								href='#'
								className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
							>
								5
							</a>
						</li>
						<li>
							<a
								href='#'
								className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
							>
								Next
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
};
export default MemberPendingList;

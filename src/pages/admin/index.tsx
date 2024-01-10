import { Outlet } from 'react-router';
import { Sidebar } from '../../components/layout';

const AdminPage = () => {
	return (
		<div className=''>
			<Sidebar />
			<div className='p-10 sm:ml-80'>
				<div className='p-4 min-h-screen border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-full'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AdminPage;

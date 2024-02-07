import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './utils/hook';
import {
	AdminPage,
	LoginPage,
	NotFoundPage,
	Dashboard,
	CreateNews,
	NewsList,
	NewsDetail,
	MemberList,
	MemberDetail,
	MemberPendingList,
	ImageGallery,
} from './pages';
import { Dialog, Snackbar } from './commons';
import EventsList from './pages/admin/Events/EventsList';
import EventsDetail from './pages/admin/Events/EventsDetail';
import MemberPendingDetail from './pages/admin/Members/MemberPendingDetail';
import MemberCreate from './pages/admin/Members/MemberCreate';
import PasswordList from './pages/admin/Password/PasswordList';
import PasswordMember from './pages/admin/Password/PasswordMember';
const ProtectedRouter = ({ children }) => {
	const location = useLocation();
	const { token } = useAuth();
	if (!token) {
		return <Navigate to='/login' replace state={{ from: location }} />;
	} 
	else {
		// onVerifyToken();
	}
	return children;
};

const ProtectedRouterAdmin = ({ children }) => {
	const location = useLocation();
	const { token, role } = useAuth();
	if (!token) {
		return <Navigate to='/login' replace state={{ from: location }} />;
	} else if (role !== 'admin') {
		return <Navigate to='/404' replace state={{ from: location }} />;
	} else {
		// onVerifyToken();
	}
	return children;
}

const ProtectedRouterMember = ({ children }) => {
	const location = useLocation();
	const { token, currentUser} = useAuth();
	const id = parseInt(location.pathname.split('/')[3]);
	console.log(currentUser, id);
	if (!token) {
		return <Navigate to='/login' replace state={{ from: location }} />;
	} else if (currentUser.user_id !== id && currentUser.role !== 'admin') {
		return <Navigate to='/404' replace state={{ from: location }} />;
	} else {
		// onVerifyToken();
	}
	return children;
}

function App() {
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRouter>
							{' '}
							<AdminPage />
						</ProtectedRouter>
					}
				>
					<Route
						path='/'
						element={
							<ProtectedRouterAdmin>
								{' '}
								<NewsList />
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/dashboard'
						element={
							<ProtectedRouterAdmin>
								{' '}
								<Dashboard />
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/news'
						element={
							<ProtectedRouterAdmin>
								{' '}
								<NewsList />
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/news/:id'
						element={
							<ProtectedRouterAdmin>
								{' '}
								<NewsDetail />
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/news/create-news'
						element={
							<ProtectedRouterAdmin>
								{' '}
								<CreateNews />
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/events'
						element={
							<ProtectedRouterAdmin>
								{' '}
								<EventsList />
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/events/:id'
						element={
							<ProtectedRouterAdmin>
								{' '}
								<EventsDetail />
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/events/create-events'
						element={
							<ProtectedRouterAdmin>
								{' '}
								<EventsDetail />
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/events'
						element={
							<ProtectedRouterAdmin>
								{' '}
								<EventsList />
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/events/:id'
						element={
							<ProtectedRouterAdmin>
								{' '}
								<EventsDetail />
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/events/create-events'
						element={
							<ProtectedRouterAdmin>
								{' '}
								<EventsDetail />
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/pending-members'
						element={
							<ProtectedRouterAdmin>
								<MemberPendingList />{' '}
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/members'
						element={
							<ProtectedRouterAdmin>
								<MemberList />{' '}
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/members/create-member'
						element={
							<ProtectedRouterAdmin>
								<MemberCreate />{' '}
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/members/:id'
						element={
							<ProtectedRouterMember>
								{' '}
								<MemberDetail />
							</ProtectedRouterMember>
						}
					/>
					<Route
						path='/admin/members-pending/:id'
						element={
							<ProtectedRouterAdmin>
								{' '}
								<MemberPendingDetail />
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/image-gallery'
						element={
							<ProtectedRouterAdmin>
								<ImageGallery />
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/password'
						element={
							<ProtectedRouterAdmin>
								{' '}
								<PasswordList />
							</ProtectedRouterAdmin>
						}
					/>
					<Route
						path='/admin/password/:id'
						element={
							<ProtectedRouterMember>
								{' '}
								<PasswordMember />
							</ProtectedRouterMember>
						}
					/>
				</Route>
				<Route path='/login' element={<LoginPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			<Snackbar></Snackbar>
			<Dialog></Dialog>
		</>
	);
}

export default App;

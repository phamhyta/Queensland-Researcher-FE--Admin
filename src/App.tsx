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

const ProtectedRouter = ({ children }) => {
	const location = useLocation();
	const { token, onVerifyToken, role } = useAuth();
	if (!token) {
		return <Navigate to='/login' replace state={{ from: location }} />;
	} else if (role != 'admin') {
		const user = localStorage.getItem('user');
		return <Navigate to={`/admin/members/${user?.id}`} replace state={{ from: location }} />;
	} else {
		// onVerifyToken();
	}

	return children;
};

function App() {
	return (
		<>
			<Routes>
				<Route
					path='/admin'
					element={
						<ProtectedRouter>
							{' '}
							<AdminPage />
						</ProtectedRouter>
					}
				>
					<Route
						path='/admin/dashboard'
						element={
							<ProtectedRouter>
								{' '}
								<Dashboard />
							</ProtectedRouter>
						}
					/>
					<Route
						path='/admin/news'
						element={
							<ProtectedRouter>
								{' '}
								<NewsList />
							</ProtectedRouter>
						}
					/>
					<Route
						path='/admin/news/:id'
						element={
							<ProtectedRouter>
								{' '}
								<NewsDetail />
							</ProtectedRouter>
						}
					/>
					<Route
						path='/admin/news/create-news'
						element={
							<ProtectedRouter>
								{' '}
								<CreateNews />
							</ProtectedRouter>
						}
					/>
					<Route
						path='/admin/events'
						element={
							<ProtectedRouter>
								{' '}
								<EventsList />
							</ProtectedRouter>
						}
					/>
					<Route
						path='/admin/events/:id'
						element={
							<ProtectedRouter>
								{' '}
								<EventsDetail />
							</ProtectedRouter>
						}
					/>
					<Route
						path='/admin/events/create-events'
						element={
							<ProtectedRouter>
								{' '}
								<EventsDetail />
							</ProtectedRouter>
						}
					/>
					<Route
						path='/admin/events'
						element={
							<ProtectedRouter>
								{' '}
								<EventsList />
							</ProtectedRouter>
						}
					/>
					<Route
						path='/admin/events/:id'
						element={
							<ProtectedRouter>
								{' '}
								<EventsDetail />
							</ProtectedRouter>
						}
					/>
					<Route
						path='/admin/events/create-events'
						element={
							<ProtectedRouter>
								{' '}
								<EventsDetail />
							</ProtectedRouter>
						}
					/>
					<Route
						path='/admin/pending-members'
						element={
							<ProtectedRouter>
								<MemberPendingList />{' '}
							</ProtectedRouter>
						}
					/>
					<Route
						path='/admin/members'
						element={
							<ProtectedRouter>
								<MemberList />{' '}
							</ProtectedRouter>
						}
					/>
					<Route
						path='/admin/members/:id'
						element={
							<ProtectedRouter>
								{' '}
								<MemberDetail />
							</ProtectedRouter>
						}
					/>
					<Route
						path='/admin/members-pending/:id'
						element={
							<ProtectedRouter>
								{' '}
								<MemberPendingDetail />
							</ProtectedRouter>
						}
					/>
					<Route
						path='/admin/image-gallery'
						element={
							<ProtectedRouter>
								<ImageGallery />
							</ProtectedRouter>
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

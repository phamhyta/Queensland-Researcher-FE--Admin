import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../utils/api';
import AuthContext from './auth-context';


const AuthProvider = ({ children }) => {
	const tokenStorage = localStorage.getItem('token') || null;
	const userStorage = JSON.parse(localStorage.getItem('user')) || null;
	const [token, setToken] = useState(tokenStorage);
	const [currentUser, setCurrentUser] = useState(userStorage);
	const [role, setRole] = useState(userStorage?.role || null);
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogin = async ({ email, password }) => {
		const res = await login({ email, password });
		if (res.success) {
			localStorage.setItem('token', res.data.access_token);
			setToken(res.data.access_token);
			setRole(res.data.data.role);
			const user = res.data.data
			localStorage.setItem('user', JSON.stringify(user));
			setCurrentUser(res.data.data);
			const origin = location.state?.from?.pathname || '/admin/news';
			if(user.role !== 'admin') {
				window.location.href  = `/admin/members/${user.user_id}`;
			} else {
				window.location.href = origin;
			}
		} else {
			return res.msg;
		}
	};


	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setToken(null);
		navigate('/login');
	};

	const value = {
		token: token,
		role: role,
		onLogin: handleLogin,
		onLogout: handleLogout,
		currentUser,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;

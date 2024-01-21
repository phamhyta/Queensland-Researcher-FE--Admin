import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../utils/api';
import AuthContext from './auth-context';


const AuthProvider = ({ children }) => {
	const tokenStorage = localStorage.getItem('token') || null;
	const userStorage = JSON.parse(localStorage.getItem('user')) || null;
	const [token, setToken] = useState(tokenStorage);
	const [currentUser, setCurrentUser] = useState(userStorage);
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogin = async ({ email, password }) => {
		const res = await login({ email, password });
		if (res.success) {
            console.log('res', res)
			localStorage.setItem('token', res.data.access_token);
			setToken(res.data.access_token);
            const user = res.data.data
			localStorage.setItem('user', JSON.stringify(user));
			setCurrentUser(res.data.data);
			const origin = location.state?.from?.pathname || '/admin/news';
			navigate(origin);
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
		onLogin: handleLogin,
		onLogout: handleLogout,
		currentUser,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;

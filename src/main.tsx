import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import StateProvider from './context/StateProvider';
import { initialState } from './context/initialState';
import reducer from './context/reducer.js';
import AuthProvider from './context/AuthProvider.tsx';
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Router>
		<AuthProvider>
			<StateProvider initialState={initialState} reducer={reducer}>
				<App />
			</StateProvider>
		</AuthProvider>
	</Router>,
);

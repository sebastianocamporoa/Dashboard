import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';
import App from './App';
import "./assets/auth.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

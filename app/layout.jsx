import AuthProvider from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';

import '@/assets/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
	title: 'Property Pulse',
	keywords: 'rental, property, real estate',
	description: 'Find the perfect rental property',
};

const MainLayout = ({ children }) => (
	<AuthProvider>
		<html>
			<body>
				<Navbar />
				<main>{children}</main>
				<Footer />
				<ToastContainer />
			</body>
		</html>
	</AuthProvider>
);

export default MainLayout;

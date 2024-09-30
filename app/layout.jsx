import AuthProvider from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import '@/assets/styles/globals.css';

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
			</body>
		</html>
	</AuthProvider>
);

export default MainLayout;

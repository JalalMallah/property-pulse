'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	const [unreadCount, setUnreadCount] = useState(0);

	const contextValue = {
		unreadCount,
		setUnreadCount,
	};

	const { data: session } = useSession();

	useEffect(() => {
		if (!session || !session.user) return;

		getUnreadMessageCount().then(({ count }) => count && setUnreadCount(count));
	}, [session, getUnreadMessageCount]);

	return (
		<GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);

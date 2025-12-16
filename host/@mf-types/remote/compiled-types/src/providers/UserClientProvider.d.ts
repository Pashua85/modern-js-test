import { ReactNode } from 'react';
import { UserClient } from '@/lib/userClient';
type UserClientProviderProps = {
    children: ReactNode;
    client?: UserClient;
};
declare const UserClientProvider: ({ children, client }: UserClientProviderProps) => import("react").JSX.Element;
export default UserClientProvider;

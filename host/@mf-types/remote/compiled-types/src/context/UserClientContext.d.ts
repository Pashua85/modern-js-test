import type { UserClient } from '@/lib/userClient';
declare const UserClientContext: import("react").Context<UserClient | null>;
export declare const UserClientProviderContext: import("react").Provider<UserClient | null>;
export declare function useUserClient(): UserClient;
export default UserClientContext;

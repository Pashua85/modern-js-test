import type { UserClient } from '../lib/userClient';
export declare function getUserName(client: UserClient, userId: string, lang: string): Promise<string>;

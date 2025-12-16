export declare class UserClient {
    private cache;
    getUserName(userId: string, lang: string): Promise<string>;
}
export declare function createUserClient(): UserClient;

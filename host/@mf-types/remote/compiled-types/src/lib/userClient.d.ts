export declare class UserClient {
    private cache;
    private pending;
    private key;
    getUserName(userId: string, lang: string): Promise<string>;
    private loadUserName;
}
export declare const userClient: UserClient;

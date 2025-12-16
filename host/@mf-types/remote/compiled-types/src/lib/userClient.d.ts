export declare class UserClient {
    private cache;
    private pending;
    private key;
    peekUserName(userId: string): string | undefined;
    getUserName(userId: string, lang: string): Promise<string>;
    private loadUserName;
}
export declare const userClient: UserClient;

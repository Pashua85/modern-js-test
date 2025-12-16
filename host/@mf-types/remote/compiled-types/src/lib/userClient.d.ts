export declare class UserClient {
    private cache;
    getUserName(userId: string, lang: string): Promise<string>;
}
export declare const userClient: UserClient;

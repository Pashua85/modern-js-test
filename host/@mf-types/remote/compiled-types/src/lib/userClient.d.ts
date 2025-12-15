export declare class UserClient {
    private cache;
    getUserName(userId: string): Promise<string>;
}
export declare function peekCache(userId: string): any;
export declare const userClient: UserClient;

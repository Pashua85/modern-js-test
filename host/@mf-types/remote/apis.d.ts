
    export type RemoteKeys = 'remote/UserName' | 'remote/UserAdditionalInfo' | 'remote/UserClientProvider';
    type PackageType<T> = T extends 'remote/UserClientProvider' ? typeof import('remote/UserClientProvider') :T extends 'remote/UserAdditionalInfo' ? typeof import('remote/UserAdditionalInfo') :T extends 'remote/UserName' ? typeof import('remote/UserName') :any;
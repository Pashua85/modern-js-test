
    export type RemoteKeys = 'remote/UserName' | 'remote/UserAdditionalInfo';
    type PackageType<T> = T extends 'remote/UserName' ? typeof import('remote/UserName') :T extends 'remote/UserAdditionalInfo' ? typeof import('remote/UserAdditionalInfo') :any;


    export type RemoteKeys = 'remote/UserName';
    type PackageType<T> = T extends 'remote/UserName' ? typeof import('remote/UserName') :any;
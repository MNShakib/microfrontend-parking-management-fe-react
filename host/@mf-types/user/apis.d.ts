
    export type RemoteKeys = 'user/UserApp' | 'user/Profile';
    type PackageType<T> = T extends 'user/Profile' ? typeof import('user/Profile') :T extends 'user/UserApp' ? typeof import('user/UserApp') :any;
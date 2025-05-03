
    export type RemoteKeys = 'admin/AdminApp';
    type PackageType<T> = T extends 'admin/AdminApp' ? typeof import('admin/AdminApp') :any;
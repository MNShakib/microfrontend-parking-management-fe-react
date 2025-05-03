
    export type RemoteKeys = 'org/OrganizationApp';
    type PackageType<T> = T extends 'org/OrganizationApp' ? typeof import('org/OrganizationApp') :any;
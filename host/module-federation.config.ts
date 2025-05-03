export const mfConfig = {
  name: 'host',
  remotes: {
    admin: 'admin@http://localhost:3001/remoteEntry.js',
    org: 'org@http://localhost:3002/remoteEntry.js',
    user: 'user@http://localhost:3003/remoteEntry.js'
  },
  shared: ['react', 'react-dom'],
};

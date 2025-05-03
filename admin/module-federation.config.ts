export const mfConfig = {
  name: 'admin',
  filename: 'remoteEntry.js',
  exposes: {
    './AdminApp': './src/AdminApp',
  },
  shared: ['react', 'react-dom'],
};

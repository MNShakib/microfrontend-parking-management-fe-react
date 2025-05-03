export const mfConfig = {
  name: 'user',
  filename: 'remoteEntry.js',
  exposes: {
    './UserApp': './src/App',            // already exposed
    './Profile': './src/pages/Profile',  // 👈 expose Profile component
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
};

export const mfConfig = {
  name: "org",
  filename: "remoteEntry.js",
  exposes: {
    './OrganizationApp': './src/OrganizationApp'
  },  
  shared: ["react", "react-dom"],
};

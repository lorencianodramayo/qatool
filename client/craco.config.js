const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#f22076", "@font-family": 'Karla, sans-serif' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

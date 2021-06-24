const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    esri: path.resolve(__dirname, './node_modules/@arcgis/core'),
    '@images': path.resolve(__dirname, './src/img'),
  })
);

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)
 
module.exports = withNativeWind(config, {
  input: './src/styles/global.css',
  inlineRem: 16, // Now 1rem = 16px. For mobile the default is 14px.
})
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.transformer.push('expo-asset/tools/hashAssetFiles');
module.exports = defaultConfig;
// module.exports = {
//   transformer: {
//     assetPlugins: ['expo-asset/tools/hashAssetFiles'],
//   },
// };

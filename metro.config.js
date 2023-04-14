/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const { getDefaultConfig } = require("metro-config")

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig()
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true
        }
      }),
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      extraNodeModules: {
        '@i18n': `${__dirname}/node_modules/@lifeomic/react-native-sdk/lib/i18n`,
      },
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    },
  }
})();

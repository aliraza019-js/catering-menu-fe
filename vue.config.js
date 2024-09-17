const { defineConfig } = require("@vue/cli-service");
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  lintOnSave: false,

  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // Optimize Vuetify
      config.plugin('VuetifyLoaderPlugin').tap(args => [{
        progressiveImages: true
      }])

      // Enable gzip compression
      config.plugin('CompressionPlugin').use(CompressionPlugin)
    }
  },

  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 250000,
      }
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  },

  devServer: {
    compress: true,
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    },
  },

  // PWA configuration (if you're using PWA features)
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/index.html',
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://your-api-domain.com/'),
          handler: 'networkFirst',
          options: {
            networkTimeoutSeconds: 20,
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
});
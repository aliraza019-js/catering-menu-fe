const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  lintOnSave: false,

  // Add production-specific optimizations
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // Optimize Vuetify
      config.plugin('VuetifyLoaderPlugin').tap(args => [{
        progressiveImages: true
      }])

      // Enable gzip compression
      config.plugin('CompressionPlugin').use(require('compression-webpack-plugin'))
    }
  },

  // Configure webpack for better performance
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

  // Configure the dev server for better performance during development
  devServer: {
    compress: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },

  // Enable modern mode for production builds
  modern: process.env.NODE_ENV === 'production',

  // Configure PWA if you're using it
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
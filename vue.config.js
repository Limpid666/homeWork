module.exports = {
  devServer: {
    port: 8080
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: "@import './src/styles/scssconfig.scss';"
      }
    }
  }
}

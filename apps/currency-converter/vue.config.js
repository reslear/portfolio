module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  filenameHashing: false,
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },
  productionSourceMap: false
};

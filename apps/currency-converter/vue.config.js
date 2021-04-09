module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/packages/portfolio/currency-converter/dist/"
      : "/",
  filenameHashing: false,
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },
  productionSourceMap: false
};

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/demo/portfolio/examples/currency-converter/"
      : "/",
  filenameHashing: false,
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },
  productionSourceMap: false
};

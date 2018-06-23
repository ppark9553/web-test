module.exports = {

  context: __dirname,

  entry: {
    cvs: ["babel-polyfill", __dirname + "/js/cvs.js"],
  },

  output: {
    path:__dirname + "/static/dist",
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      }
    ]
  },

}

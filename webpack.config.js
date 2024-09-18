const path = require('path');

module.exports = {
  entry: './src/index.js', // Masuk ke file utama
  output: {
    filename: 'superfetch.min.js', // Nama file output
    path: path.resolve(__dirname, 'dist'), // Folder output
    library: 'SuperFetch', // Nama library yang digunakan
    libraryTarget: 'umd', // UMD memungkinkan dipakai di Node dan browser
    globalObject: 'typeof self !== "undefined" ? self : this', // Perbaikan lingkungan global
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

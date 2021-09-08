const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = {
  entry: {
    'gradient-map-editor': './src/index.js',
  },
  output: {
    path: path.join(__dirname, "docs"),
    filename: '[name].js', //バンドルのファイル名。[name]の部分にはentryで指定したキーが入る
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.vue'
    ]
  },
  plugins: [
    new VueLoaderPlugin
  ],
  //webpack-dev-server用設定
  devServer: {
    open: {
      target: "index.html", //自動で指定したページを開く
    },
    static: {
      directory: path.join(__dirname, 'docs'), // HTML等コンテンツのルートディレクトリ
      watch: true, //コンテンツの変更監視をする
    },
    port: 3000, // ポート番号
  }
};

module.exports = config;

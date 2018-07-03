const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
          a:"./resources/assets/js/app_a.js",
          b:"./resources/assets/js/app_b.js"
      },
    output: {
        path: path.resolve(__dirname + '/public/js'),
        filename: '[name].bundle.js',//webpack --inline --hot can not use chunkhash
        publicPath:"/js/"
     },
     optimization: {
      splitChunks: {
        chunks: "initial",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
            },
          vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all"
            }
        }
      },
        runtimeChunk: {
        "name": "manifest"
     }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
            use: [
              {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env','@babel/react',['@babel/preset-stage-0',{ "decoratorsLegacy": true }]],
                plugins: [
                  ["@babel/plugin-transform-runtime", {
                    "helpers": false,
                    "polyfill": true,
                    "regenerator": true,
                    "moduleName": "@babel/runtime"
                  }]
                ]
                 }
              },
              {
                loader: "eslint-loader",
                options: {
                  // eslint options (if necessary)                
                 }
              }
           ]
          },
        ]
      },
    plugins: [
      new HtmlWebpackPlugin({
        title:"this is A",
        chunks:["manifest","vendors","a",],
        filename:"../../resources/views/a.blade.php",
        template:"./resources/template/a_template.blade.php",
        inject:true
      }),
      new HtmlWebpackPlugin({
        title:"this is B",
        chunks:["manifest","vendors","b",],
        filename:"../../resources/views/b.blade.php",
        template:"./resources/template/b_template.blade.php",
        inject:true
      }),
      new webpack.NamedModulesPlugin()
    ],
    resolve: {
        extensions: ['.css', '.js', '.jsx'],
    },
    watch:true,
    devtool:'source-map'  
}
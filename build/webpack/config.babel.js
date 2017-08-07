import path from 'path'
import webpack from 'webpack'
import postcssNext from 'postcss-cssnext'

import { WDS_PORT } from '../../src/shared/config'

const isProd = process.env.NODE_ENV === 'production'

export default {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './src/client'
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, '../../public'),
    publicPath: isProd ? '../../public/' : `http://localhost:${WDS_PORT}/public/`
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                postcssNext
              ]
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    port: WDS_PORT,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}

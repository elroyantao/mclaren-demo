// import path from 'path'
//
// import { WDS_PORT } from './src/shared/config'
//
// const isProd = process.env.NODE_ENV === 'production'
//
// export default {
//   entry: [
//     'babel-polyfill',
//     './src/client'
//   ],
//   output: {
//     filename: 'js/bundle.js',
//     path: path.resolve(__dirname, './public'),
//     publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/public/`
//   },
//   module: {
//     rules: [
//       { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ }
//     ]
//   },
//   devtool: 'source-maps',
//   resolve: {
//     extensions: ['.js', '.jsx']
//   },
//   devServer: {
//     port: WDS_PORT
//   }
// }

import webpackConfig from './build/webpack/config.babel'

export default webpackConfig

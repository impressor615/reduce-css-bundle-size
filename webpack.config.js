const path = require('path');
const incstr = require('incstr');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const createUniqueIdGenerator = () => {
  const index = {};
  const generateNextId = incstr.idGenerator({
    alphabet: 'abcefghijklmnopqrstuvwxyz0123456789'
  });

  return (name) => {
    if (index[name]) {
      return index[name];
    }
    let nextId;

    // className should be started with Numbers
    do {
      nextId = generateNextId();
    } while (/^[0-9]/.test(nextId));

    index[name] = generateNextId();

    return index[name];
  };
};

const uniqueIdGenerator = createUniqueIdGenerator();
const generateScopedName = (localName, resourcePath) => {
  const componentName = resourcePath.split('/').slice(-2, -1);
  return `${uniqueIdGenerator(componentName)}_${uniqueIdGenerator(localName)}`
};


module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.less'],
  },
  entry: './app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          extends: path.resolve(__dirname, '.babelrc'),
          plugins: [
            [
              'react-css-modules',
              {
                filetypes: {
                  '.less': {
                    syntax: 'postcss-less'
                  }
                },
                generateScopedName,
              }
            ],
          ]
        },
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                getLocalIdent: (context, localIdentName, localName) => {
                  return generateScopedName(localName, context.resourcePath);
                },
              }
            },
            'less-loader',
          ],
        })
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};

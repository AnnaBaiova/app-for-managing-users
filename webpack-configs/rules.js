const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const babelRule = (isEnvProduction) => ({
  test: /.(m?js|m?jsx)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              useBuiltIns: 'usage',
              corejs: 3,
            },
          ],
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
        ],
        plugins: [
          ['@babel/plugin-proposal-class-properties'],
          [
            'babel-plugin-import',
            {
              libraryName: 'lodash',
              libraryDirectory: '',
              camel2DashComponentName: false,
            },
            'lodash',
          ],
          ...(isEnvProduction ? [['transform-react-remove-prop-types', { removeImport: true }]] : []),
        ],
      },
    },
  ],
});

const fileRules = [
  {
    test: /\.(png|jpg|jpeg|gif|ico|woff|woff2|ttf|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    type: 'asset/resource',
  },
  {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  },
];

const styleRule = (isEnvProduction) => ({
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: !isEnvProduction,
        importLoaders: 3,
      },
    },
  ],
});

module.exports = { babelRule, styleRule, fileRules };

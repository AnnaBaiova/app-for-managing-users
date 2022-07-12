const path = require('path');

const { rules: { babelRule, styleRule, fileRules }, alias, plugins } = require('./webpack-configs');

module.exports = (env) => {
  const isProduction = env && env.production;
  const mode = isProduction ? 'production' : 'development';

  return {
    mode,
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash].js',
      publicPath: '/',
      clean: true,
    },
    plugins: plugins(mode),
    resolve: {
      extensions: ['.mjs', '.js', '.jsx'],
      alias,
    },
    module: {
      rules: [
        babelRule(isProduction),
        ...fileRules,
        styleRule(isProduction),
      ],
    },
    devServer: {
      open: true,
      historyApiFallback: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
  };
};

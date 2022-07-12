const { resolveApp, transformWebpackAlias } = require('./helpers/_utils');

const appFeatureDirectory = resolveApp('./src/features');
const appRootDirectory = resolveApp('./');

const rootAlias = {
  AppConfigs: 'app-configs',
  Patterns: 'src/patterns',
  Styles: 'src/styles',
  Shapes: 'src/shapes',
  Utils: 'src/utils',
  Web: 'src',
};

const appAlias = {
  App: 'App',
  Auth: 'Auth',
  Users: 'Users',
};

const alias = {
  ...transformWebpackAlias(rootAlias, appRootDirectory),
  ...transformWebpackAlias(appAlias, appFeatureDirectory),
};

module.exports = alias;

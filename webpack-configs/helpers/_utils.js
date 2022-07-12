const fs = require('fs');
const path = require('path');
/**
 * Set the application directory to the working directory
 */
const appRootDirectory = fs.realpathSync(process.cwd());
/**
 * Resolves all directories directory based upon the root
 * directory of the application
 * @param {string} absPath the absolute path of the directory or file based upon the root
 * of the directory
 */
const resolveApp = (absPath) => path.resolve(appRootDirectory, absPath);

/**
 * Resolves the different configuration files
 * @param {string} relativePath a path that is local to this configuration directory
 * @param {string} thisDirectory of directory a path that is local to this configuration directory
 */
const resolveLocal = (thisDirectory, relativePath) => path.resolve(thisDirectory, relativePath);

/**
 * Transforms any alias object into
 * an object that can be consumed by webpack
 * @param {object} aliasObject the aliases described in the local config
 * @param {string} appRootDir the rootPath of where the aliases should based from
 */
const transformWebpackAlias = (aliasObject, appRootDir) => Object.keys(aliasObject)
  .map((key) => ({
    [key]: resolveApp(`${appRootDir}/${aliasObject[key]}`),
  }))
  .reduce((result, item, index, arr) => {
    const key = Object.keys(item)[0];
    return {
      ...result,
      [key]: arr[index][key],
    };
  }, {});

/**
 * Transforms a static envVar object and prepares it to be inserted into
 * the application
 * @param {object} varObj the object that needs to be transformed and stringified
 * to be able to be put inside of the webpack build
 */
const transformWebpackEnvVars = (varObj) => Object.keys(varObj)
  .map((key) => ({
    [key]: JSON.stringify(varObj[key]),
  }))
  .reduce((result, item, index, arr) => {
    const key = Object.keys(item)[0];
    return {
      ...result,
      [key]: arr[index][key],
    };
  }, {});

/**
 * Transforms the configuration array that is provided by the user in the
 * cadent.config.js into the configuration that the CopyWebpackPlugin
 * needs
 *
 * @param {array} copyArr the array that needs to transformed
 * @param {string} envName the name of the environment that was resolved in the webpack build
 * @param {string} distDir the absolute path of the distribution directory that things will
 * be deployed from
 */
const createWebpackCopy = (copyArr = [], envName, distDir) => (
  copyArr.reduce((result, { environments: targetEnvironments, location }) => {
    if (
      targetEnvironments.indexOf('all') !== -1
      || targetEnvironments.indexOf(envName) !== -1
    ) {
      return [...result, {
        from: location,
        to: distDir,
      }];
    }
    return result;
  }, [])
);

/**
 * Transforms the config.js app.alias object into
 * an object that can be consumed by Jest
 * @param {object} aliasObject the aliases described in the local config
 * @param {string} deepDir the rootPath of where the aliases should based from
 */
const transformJestAlias = (aliasObject, deepDir = null) => Object.keys(aliasObject)
  .map((key) => ({
    [key]: aliasObject[key],
  }))
  .reduce((result, item, index, arr) => {
    const key = Object.keys(item)[0];
    const transformedKey = `^${key}(.*)$`;
    const value = deepDir
      ? `<rootDir>/${deepDir}${arr[index][key]}$1`
      : `<rootDir>/${arr[index][key]}$1`;
    return {
      ...result,
      [transformedKey]: value,
    };
  }, {});

const resolveEnvDetails = (env, shouldCompress, envObject) => {
  const isEnvProduction = env === envObject.stage
    || env === envObject.demo
    || env === envObject.production;
  const isEnvLocal = env === envObject.local;
  const isTestingProdBuild = isEnvLocal && shouldCompress;

  return {
    envName: env,
    isEnvProduction,
    isEnvLocal,
    isTestingProdBuild,
    mode: isEnvProduction || isTestingProdBuild ? 'production' : 'development',
  };
};

module.exports = {
  createWebpackCopy,
  resolveApp,
  resolveEnvDetails,
  resolveLocal,
  transformJestAlias,
  transformWebpackAlias,
  transformWebpackEnvVars,
};

/**
 * ajout des fichier dde rsrc
 */
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config'); // <-- important pour les projets Expo Bare

const projectRoot = __dirname;
const rsrcRoot = path.resolve(projectRoot, '../../rsrc');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [rsrcRoot];

config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    rsrc: rsrcRoot,
};

config.resolver.assetExts = [
    ...config.resolver.assetExts,
    'png', 'yaml'
];

module.exports = config;

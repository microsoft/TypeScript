'use strict';

module.exports = {
  init: require('./src/init'),
  write: require('./src/write'),
  mapSources: require('@gulp-sourcemaps/map-sources'),
  identityMap: require('@gulp-sourcemaps/identity-map')
};

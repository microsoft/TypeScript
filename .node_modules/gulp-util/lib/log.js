var hasGulplog = require('has-gulplog');

module.exports = function(){
  if(hasGulplog()){
    // specifically deferring loading here to keep from registering it globally
    var gulplog = require('gulplog');
    gulplog.info.apply(gulplog, arguments);
  } else {
    // specifically defering loading because it might not be used
    var fancylog = require('fancy-log');
    fancylog.apply(null, arguments);
  }
  return this;
};

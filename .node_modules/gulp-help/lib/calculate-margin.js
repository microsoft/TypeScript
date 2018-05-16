/**
 * @param {object} tasksObj - gulp.tasks
 *
 * returns:
 *  margin - length of longest task / options name
 *  hasOptions - true if any task has option(s)
 *
 * @returns {{margin: number, hasOptions: boolean}}
 */
module.exports = function (tasksObj) {
  var hasOptions = false;
  var margin = Object.keys(tasksObj).reduce(function (m, taskName) {
    var optionsMargin = 0, opts;
    // if exists, iterate options list to calculate margin for options
    var includeAll = process.argv.indexOf('--all') !== -1;
    if (includeAll || (tasksObj[taskName].help && tasksObj[taskName].help.options)) {
      var help = tasksObj[taskName].help || {options: {}};
      opts = Object.keys(help.options).sort();
      optionsMargin = opts.reduce(function (m, opt) {
        // if, at any time while iterating the tasks array, we also iterate an opts array, set hasOptions flag
        hasOptions = true;
        return m > opt.length ? m : opt.length;
      }, 0);
    }

    if (!(tasksObj[taskName].help || includeAll) || (m > taskName.length && m > optionsMargin)) {
      return m;
    } else if (optionsMargin > taskName.length) {
      return optionsMargin;
    } else {
      return taskName.length;
    }
  }, 0);
  return {
    margin: margin,
    hasOptions: hasOptions
  };
};


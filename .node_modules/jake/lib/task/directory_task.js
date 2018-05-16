var DirectoryTask
  , FileTask = require('./file_task').FileTask;

/**
  @name jake
  @namespace jake
*/
/**
  @name jake.DirectoryTask
  @constructor
  @augments EventEmitter
  @augments jake.Task
  @augments jake.FileTask
  @description A Jake DirectoryTask

  @param {String} name The name of the directory to create.
 */
DirectoryTask = function (name) {
  this.modTime = null;
  // Do constructor-work only on actual instances, not when used
  // for inheritance
  if (arguments.length) {
    this.init.apply(this, arguments);
  }
};
DirectoryTask.prototype = new FileTask();
DirectoryTask.prototype.constructor = DirectoryTask;

exports.DirectoryTask = DirectoryTask;

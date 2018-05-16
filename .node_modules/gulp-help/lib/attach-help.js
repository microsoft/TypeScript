module.exports = function (task, msg, deps, taskOptions) {
  if (!task) {
    return;
  }

  if (msg === false) {
    delete task.help;
    return;
  }

  msg = (typeof msg === 'string') ? msg : '';

  var aliases = '';
  if (taskOptions.aliases && taskOptions.aliases.length > 0) {
    aliases = 'Aliases: ' + taskOptions.aliases.join(', ');
  }

  var depsMessage = '';
  if (deps && typeof deps === 'object' && deps.length > 0) {
    depsMessage = '[' + deps.join(', ') + ']';
  }

  task.help = {
    message: msg,
    aliases: aliases,
    depsMessage: depsMessage,
    options: taskOptions.options || {}
  };
};

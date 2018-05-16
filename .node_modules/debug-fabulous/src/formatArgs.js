module.exports = function formatArgs(args) {
  var debugApi = args.debugApi;
  var options = args.options;

  if(options.formatArgs == true){
    /*
    fixing it so we don't get redundant timestamps on prod
    https://github.com/visionmedia/debug/issues/161
    */
    debugApi.formatArgs = function() {
      if (this.useColors)
        arguments[0] = '  \u001b[9' + this.color + 'm' + this.namespace + ' ' + '\u001b[0m' + arguments[0];
      else
        arguments[0] = '  ' + this.namespace + ' ' + arguments[0];

      return arguments;
    }
  }
  else if ( typeof options.formatArgs === 'function'){
    debugApi.formatArgs = options.formatArgs;
  }

  return debugApi;
}

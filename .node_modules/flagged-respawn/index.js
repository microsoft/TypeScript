const reorder = require('./lib/reorder');
const respawn = require('./lib/respawn');
const remover = require('./lib/remover');

const FORBID_RESPAWNING_FLAG = '--no-respawning';

module.exports = function (flags, argv, forcedFlags, execute) {
  if (!flags) {
    throw new Error('You must specify flags to respawn with.');
  }
  if (!argv) {
    throw new Error('You must specify an argv array.');
  }

  if (typeof forcedFlags === 'function') {
    execute = forcedFlags;
    forcedFlags = [];
  }

  if (typeof forcedFlags === 'string') {
    forcedFlags = [forcedFlags];
  }

  if (!Array.isArray(forcedFlags)) {
    forcedFlags = [];
  }

  var index = argv.indexOf(FORBID_RESPAWNING_FLAG);
  if (index >= 0) {
    argv = argv.slice(0, index).concat(argv.slice(index + 1));
    argv = remover(flags, argv);
    execute(true, process, argv);
    return;
  }

  var proc = process;
  var reordered = reorder(flags, argv);
  var ready = JSON.stringify(argv) === JSON.stringify(reordered);

  if (forcedFlags.length) {
    reordered = reordered.slice(0, 1)
      .concat(forcedFlags)
      .concat(reordered.slice(1));
    ready = false;
  }

  if (!ready) {
    reordered.push(FORBID_RESPAWNING_FLAG);
    proc = respawn(reordered);
  }
  execute(ready, proc, reordered);
};

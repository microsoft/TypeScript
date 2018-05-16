var parents = require('../');
var dir = 'C:\\Program Files\\Maxis\\Sim City 2000\\cities';

var dirs = parents(dir, { platform : 'win32' });
console.dir(dirs);

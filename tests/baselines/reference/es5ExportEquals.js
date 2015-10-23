//// [es5ExportEquals.ts]

export function f() { }

export = f;


//// [es5ExportEquals.js]
function f() { }
exports.f = f;
module.exports = f;

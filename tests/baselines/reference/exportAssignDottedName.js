//// [tests/cases/conformance/externalModules/exportAssignDottedName.ts] ////

//// [foo1.ts]
export function x(){
	return true;
}

//// [foo2.ts]
import foo1 = require('./foo1');
export = foo1.x; // Error, export assignment must be identifier only


//// [foo1.js]
function x() {
    return true;
}
exports.x = x;
//// [foo2.js]
var foo1 = require('./foo1');
x; // Error, export assignment must be identifier only
module.exports = foo1;

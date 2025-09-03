//// [tests/cases/conformance/externalModules/exportAssignDottedName.ts] ////

//// [foo1.ts]
export function x(){
	return true;
}

//// [foo2.ts]
import foo1 = require('./foo1');
export = foo1.x; // Ok


//// [foo1.js]
export function x() {
    return true;
}
//// [foo2.js]
export {};

//// [tests/cases/conformance/externalModules/exportAssignDottedName.ts] ////

//// [foo2.ts]
import foo1 = require('./foo1');
export = foo1.x; // Ok

//// [foo1.ts]
export function x(): boolean{
	return true;
}


/// [Declarations] ////



//// [foo1.d.ts]
export declare function x(): boolean;

//// [foo2.d.ts]
import foo1 = require('./foo1');
declare const _default: typeof foo1.x;
export = _default;

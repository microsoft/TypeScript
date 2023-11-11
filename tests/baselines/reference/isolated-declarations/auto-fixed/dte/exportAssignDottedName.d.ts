//// [tests/cases/conformance/externalModules/exportAssignDottedName.ts] ////

//// [foo2.ts]
import foo1 = require('./foo1');
export = foo1.x; // Ok

//// [foo1.ts]
export function x(): boolean{
	return true;
}


/// [Declarations] ////



//// [/.src/foo1.d.ts]
export declare function x(): boolean;

//// [/.src/foo2.d.ts]
declare const _default: invalid;
export = _default;
/// [Errors] ////

foo2.ts(2,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== foo2.ts (1 errors) ====
    import foo1 = require('./foo1');
    export = foo1.x; // Ok
             ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    
==== foo1.ts (0 errors) ====
    export function x(): boolean{
    	return true;
    }
    
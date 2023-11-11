//// [tests/cases/conformance/externalModules/reexportClassDefinition.ts] ////

//// [foo3.ts]
import foo2 = require('./foo2')
class x extends foo2.x {}


//// [foo1.ts]
class x{}
export = x; 

//// [foo2.ts]
import foo1 = require('./foo1');

export = {
    x: foo1
}


/// [Declarations] ////



//// [/.src/foo1.d.ts]
declare class x {
}
export = x;

//// [/.src/foo2.d.ts]
declare const _default: invalid;
export = _default;

//// [/.src/foo3.d.ts]
export {};
/// [Errors] ////

foo2.ts(4,8): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== foo3.ts (0 errors) ====
    import foo2 = require('./foo2')
    class x extends foo2.x {}
    
    
==== foo1.ts (0 errors) ====
    class x{}
    export = x; 
    
==== foo2.ts (1 errors) ====
    import foo1 = require('./foo1');
    
    export = {
        x: foo1
           ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
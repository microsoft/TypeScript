//// [tests/cases/compiler/declarationEmitHasTypesRefOnNamespaceUse.ts] ////

//// [dep.d.ts]
declare namespace NS {
    interface Dep {
    }
}
//// [package.json]
{
    "typings": "dep.d.ts"
}
//// [index.ts]
class Src implements NS.Dep { }


//// [index.js]
var Src = /** @class */ (function () {
    function Src() {
    }
    return Src;
}());


//// [index.d.ts]
/// <reference types="dep" />
declare class Src implements NS.Dep {
}


//// [DtsFileErrors]


error TS2688: Cannot find type definition file for 'dep'.
/src/index.d.ts(1,23): error TS2688: Cannot find type definition file for 'dep'.
/src/index.d.ts(2,30): error TS2503: Cannot find namespace 'NS'.


!!! error TS2688: Cannot find type definition file for 'dep'.
==== /src/index.d.ts (2 errors) ====
    /// <reference types="dep" />
                          ~~~
!!! error TS2688: Cannot find type definition file for 'dep'.
    declare class Src implements NS.Dep {
                                 ~~
!!! error TS2503: Cannot find namespace 'NS'.
    }
    
==== /deps/dep/dep.d.ts (0 errors) ====
    declare namespace NS {
        interface Dep {
        }
    }
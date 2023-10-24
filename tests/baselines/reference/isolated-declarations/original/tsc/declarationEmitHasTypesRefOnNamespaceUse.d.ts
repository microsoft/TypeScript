//// [tests/cases/compiler/declarationEmitHasTypesRefOnNamespaceUse.ts] ////

//// [/src/index.ts]
class Src implements NS.Dep { }

//// [/deps/dep/dep.d.ts]
declare namespace NS {
    interface Dep {
    }
}
//// [/deps/dep/package.json]
{
    "typings": "dep.d.ts"
}

/// [Declarations] ////



//// [/src/index.d.ts]
declare class Src implements NS.Dep {
}
/// [Errors] ////

/src/index.ts(1,22): error TS9008: Declaration emit for this file requires adding a type reference directive. Add a type reference directive to dep to unblock declaration emit.


==== /src/index.ts (1 errors) ====
    class Src implements NS.Dep { }
                         ~~~~~~
!!! error TS9008: Declaration emit for this file requires adding a type reference directive. Add a type reference directive to dep to unblock declaration emit.
    
==== /deps/dep/dep.d.ts (0 errors) ====
    declare namespace NS {
        interface Dep {
        }
    }
==== /deps/dep/package.json (0 errors) ====
    {
        "typings": "dep.d.ts"
    }
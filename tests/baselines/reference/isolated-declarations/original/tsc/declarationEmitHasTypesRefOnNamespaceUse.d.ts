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

/src/index.ts(1,22): error TS9024: Declaration emit for this file requires adding a type reference directive which are not supported with --isolatedDeclarations


==== /src/index.ts (1 errors) ====
    class Src implements NS.Dep { }
                         ~~~~~~
!!! error TS9024: Declaration emit for this file requires adding a type reference directive which are not supported with --isolatedDeclarations
    
==== /deps/dep/dep.d.ts (0 errors) ====
    declare namespace NS {
        interface Dep {
        }
    }
==== /deps/dep/package.json (0 errors) ====
    {
        "typings": "dep.d.ts"
    }
//// [tests/cases/compiler/declarationEmitHasTypesRefOnNamespaceUse.ts] ////

//// [index.ts]
class Src implements NS.Dep { }

//// [dep.d.ts]
declare namespace NS {
    interface Dep {
    }
}
//// [package.json]
{
    "typings": "dep.d.ts"
}

/// [Declarations] ////



//// [/src/index.d.ts]
declare class Src implements NS.Dep {
}

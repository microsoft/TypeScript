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

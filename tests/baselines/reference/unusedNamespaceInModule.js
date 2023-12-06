//// [tests/cases/compiler/unusedNamespaceInModule.ts] ////

//// [unusedNamespaceInModule.ts]
module A {
    namespace B { }
    export namespace C {}
}

//// [unusedNamespaceInModule.js]

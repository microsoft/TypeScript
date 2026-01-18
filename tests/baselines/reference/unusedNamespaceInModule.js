//// [tests/cases/compiler/unusedNamespaceInModule.ts] ////

//// [unusedNamespaceInModule.ts]
namespace A {
    namespace B { }
    export namespace C {}
}

//// [unusedNamespaceInModule.js]

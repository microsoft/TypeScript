//// [tests/cases/compiler/unusedNamespaceInNamespace.ts] ////

//// [unusedNamespaceInNamespace.ts]
namespace A {
    namespace B { }
    export namespace C {}
}

//// [unusedNamespaceInNamespace.js]

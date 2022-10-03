//// [tests/cases/compiler/mergedClassWithNamespacePrototype.ts] ////

//// [a.d.ts]
declare class Foo {}

//// [b.ts]
declare namespace Foo {
    namespace prototype {
        function f(): void;
    }
}


//// [b.js]

//// [tests/cases/compiler/mixedExports.ts] ////

//// [mixedExports.ts]
declare module M {
     function foo();
     export function foo();
     function foo();
}

declare module M1 {
     export interface Foo {}
     interface Foo {}
}

module A {
     interface X {x}
     export module X {}
     interface X {y}
}

//// [mixedExports.js]

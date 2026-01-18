//// [tests/cases/compiler/mixedExports.ts] ////

//// [mixedExports.ts]
declare namespace M {
     function foo();
     export function foo();
     function foo();
}

declare namespace M1 {
     export interface Foo {}
     interface Foo {}
}

namespace A {
     interface X {x}
     export namespace X {}
     interface X {y}
}

//// [mixedExports.js]

declare module M {
     function foo();
     export function foo();
     function foo();
}

declare module M1 {
     export interface Foo {}
     interface Foo {}
}

namespace A {
     interface X {x}
     export module X {}
     interface X {y}
}
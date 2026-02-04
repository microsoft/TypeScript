//// [tests/cases/compiler/stripInternal1.ts] ////

//// [stripInternal1.ts]
class C {
  foo(): void { }
  // @internal
  bar(): void { }
}

//// [stripInternal1.js]
"use strict";
class C {
    foo() { }
    // @internal
    bar() { }
}


//// [stripInternal1.d.ts]
declare class C {
    foo(): void;
}

//// [tests/cases/compiler/out-flag2.ts] ////

//// [a.ts]
class A { }

//// [b.ts]
class B { }


//// [c.js]
"use strict";
class A {
}
class B {
}
//# sourceMappingURL=c.js.map

//// [c.d.ts]
declare class A {
}
declare class B {
}

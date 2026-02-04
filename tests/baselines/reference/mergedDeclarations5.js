//// [tests/cases/compiler/mergedDeclarations5.ts] ////

//// [a.ts]
class A {
    protected foo() {}
}
//// [b.ts]
interface A { }

class B extends A {
    protected foo() {}
}

//// [a.js]
"use strict";
class A {
    foo() { }
}
//// [b.js]
"use strict";
class B extends A {
    foo() { }
}

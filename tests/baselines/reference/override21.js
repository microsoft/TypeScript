//// [tests/cases/conformance/override/override21.ts] ////

//// [override21.ts]
const foo = Symbol();
class A { }

class B extends A {
    override [foo]() { }
}


//// [override21.js]
"use strict";
const foo = Symbol();
class A {
}
class B extends A {
    [foo]() { }
}

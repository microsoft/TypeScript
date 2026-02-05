//// [tests/cases/conformance/override/override15.ts] ////

//// [override15.ts]
class A {
    doSomething() {}
}

class B extends A {
    override doSomethang() {}
}


//// [override15.js]
"use strict";
class A {
    doSomething() { }
}
class B extends A {
    doSomethang() { }
}

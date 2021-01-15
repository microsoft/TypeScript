//// [privateNameConstructorReserved.ts]
class A {
    #constructor() {}      // Error: `#constructor` is a reserved word.
}


//// [privateNameConstructorReserved.js]
var _constructor;
class A {
    () { } // Error: `#constructor` is a reserved word.
}
_constructor = new WeakMap();

//// [privateNameConstructorReserved.ts]
class A {
    #constructor() {}      // Error: `#constructor` is a reserved word.
}


//// [privateNameConstructorReserved.js]
var _constructor, _constructor_1;
class A {
    constructor() {
        _constructor.add(this);
    }
}
_constructor = new WeakSet(), _constructor_1 = function _constructor_1() { };

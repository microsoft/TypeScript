//// [privateNameConstructorReserved.ts]
class A {
    #constructor() {}      // Error: `#constructor` is a reserved word.
}


//// [privateNameConstructorReserved.js]
var _A_instances, _A_constructor;
class A {
    constructor() {
        _A_instances.add(this);
    }
}
_A_instances = new WeakSet(), _A_constructor = function _A_constructor() { };

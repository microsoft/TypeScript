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
    #constructor() { } // Error: `#constructor` is a reserved word.
}
_A_instances = new WeakSet();

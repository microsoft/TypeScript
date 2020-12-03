//// [privateNameDuplicateField.ts]
class A {
    #foo = "foo";
    #foo = "foo";
}


//// [privateNameDuplicateField.js]
"use strict";
var _foo, _foo_1;
class A {
    constructor() {
        _foo_1.set(this, "foo");
        _foo_1.set(this, "foo");
    }
}
_foo = new WeakMap(), _foo_1 = new WeakMap();

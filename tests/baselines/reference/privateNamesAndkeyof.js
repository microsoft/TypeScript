//// [privateNamesAndkeyof.ts]
class A {
    #foo = 3;
    bar = 3;
    baz = 3;
}

type T = keyof A     // should not include '#foo'


//// [privateNamesAndkeyof.js]
"use strict";
var _foo;
class A {
    constructor() {
        _foo.set(this, 3);
        this.bar = 3;
        this.baz = 3;
    }
}
_foo = new WeakMap();

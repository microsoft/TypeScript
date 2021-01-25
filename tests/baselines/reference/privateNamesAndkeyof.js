//// [privateNamesAndkeyof.ts]
class A {
    #fooField = 3;
    #fooMethod() { };
    get #fooProp() { return 1; };
    set #fooProp(value: number) { };
    bar = 3;
    baz = 3;
}

type T = keyof A     // should not include '#foo*'


//// [privateNamesAndkeyof.js]
"use strict";
var _fooField, _fooMethod, _fooMethod_1, _fooProp, _fooProp_1;
class A {
    constructor() {
        _fooMethod.add(this);
        _fooField.set(this, 3);
        this.bar = 3;
        this.baz = 3;
    }
    ;
    get () { return 1; }
    ;
    set (value) { }
    ;
}
_fooField = new WeakMap(), _fooMethod = new WeakSet(), _fooMethod_1 = function _fooMethod_1() { };

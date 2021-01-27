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
var _A_fooField, _A_fooMethod, _A_fooProp_get, _A_fooProp_set, _A_instances;
class A {
    constructor() {
        _A_instances.add(this);
        _A_fooField.set(this, 3);
        this.bar = 3;
        this.baz = 3;
    }
    ;
    ;
    ;
}
_A_fooField = new WeakMap(), _A_instances = new WeakSet(), _A_fooMethod = function _A_fooMethod() { }, _A_fooProp_get = function _A_fooProp_get() { return 1; }, _A_fooProp_set = function _A_fooProp_set(value) { };

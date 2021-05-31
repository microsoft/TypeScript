//// [privateNamesAndkeyof.ts]
class A {
    #fooField = 3;
    #fooMethod() { };
    get #fooProp() { return 1; };
    set #fooProp(value: number) { };
    bar = 3;
    baz = 3;
}

// `keyof A` should not include '#foo*'
let k: keyof A = "bar"; // OK
k = "baz"; // OK

k = "#fooField"; // Error
k = "#fooMethod"; // Error
k = "#fooProp"; // Error

k = "fooField"; // Error
k = "fooMethod"; // Error
k = "fooProp"; // Error


//// [privateNamesAndkeyof.js]
"use strict";
var _A_instances, _A_fooField, _A_fooMethod, _A_fooProp_get, _A_fooProp_set;
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
// `keyof A` should not include '#foo*'
let k = "bar"; // OK
k = "baz"; // OK
k = "#fooField"; // Error
k = "#fooMethod"; // Error
k = "#fooProp"; // Error
k = "fooField"; // Error
k = "fooMethod"; // Error
k = "fooProp"; // Error

//// [privateNameDuplicateField.ts]
class A {
    #foo = "foo";
    #foo = "foo";
}

class A2 {
    #foo = "foo";
    #foo() {}
}


class A3 {
    #foo = "foo";
    get #foo() { return ""}
}

class A4 {
    #foo() { return ""}
    #foo() { return ""}
}


class A5 {
    #foo() { return ""}
    get #foo() { return ""}
}


class A6 {
    #foo = "foo";
    #foo() { return ""}
    get #foo() { return ""}
}


//// [privateNameDuplicateField.js]
"use strict";
var _foo, _foo_1, _foo_2, _foo_3, _foo_4, _foo_5, _foo_6, _foo_7, _foo_8, _foo_9, _foo_10, _foo_11, _foo_12;
class A {
    constructor() {
        _foo_1.set(this, "foo");
        _foo_1.set(this, "foo");
    }
}
_foo = new WeakMap(), _foo_1 = new WeakMap();
class A2 {
    constructor() {
        _foo_3.set(this, "foo");
    }
    () { }
}
_foo_2 = new WeakMap(), _foo_3 = new WeakMap();
class A3 {
    constructor() {
        _foo_5.set(this, "foo");
    }
    get () { return ""; }
}
_foo_4 = new WeakMap(), _foo_5 = new WeakMap();
class A4 {
    () { return ""; }
    () { return ""; }
}
_foo_6 = new WeakMap(), _foo_7 = new WeakMap();
class A5 {
    () { return ""; }
    get () { return ""; }
}
_foo_8 = new WeakMap(), _foo_9 = new WeakMap();
class A6 {
    constructor() {
        _foo_12.set(this, "foo");
    }
    () { return ""; }
    get () { return ""; }
}
_foo_10 = new WeakMap(), _foo_11 = new WeakMap(), _foo_12 = new WeakMap();

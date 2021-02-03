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

class A7 {
    get #foo() { return ""; }
    get #foo() { return ""; }
}

class A8 {
    set #foo(a: string) {}
    set #foo(a: string) {}
}

class A9 {
    get #foo() { return ""; }
    set #foo(a: string) {}
    get #foo() { return ""; }
    set #foo(a: string) {}
}


//// [privateNameDuplicateField.js]
"use strict";
var _A_foo, _A_foo_1, _A2_foo, _A2_foo_1, _A2_instances, _A3_foo, _A3_foo_get, _A3_instances, _A4_foo, _A4_foo_1, _A4_instances, _A5_foo, _A5_foo_get, _A5_instances, _A6_foo, _A6_foo_1, _A6_foo_get, _A6_instances, _A7_foo_get, _A7_foo_get_1, _A7_instances, _A8_foo_set, _A8_foo_set_1, _A8_instances, _A9_foo_get, _A9_foo_set, _A9_foo_get_1, _A9_foo_set_1, _A9_instances;
class A {
    constructor() {
        _A_foo_1.set(this, "foo");
        _A_foo_1.set(this, "foo");
    }
}
_A_foo = new WeakMap(), _A_foo_1 = new WeakMap();
class A2 {
    constructor() {
        _A2_instances.add(this);
    }
}
_A2_foo = new WeakMap(), _A2_instances = new WeakSet(), _A2_foo_1 = function _A2_foo_1() { };
class A3 {
    constructor() {
        _A3_instances.add(this);
    }
}
_A3_foo = new WeakMap(), _A3_instances = new WeakSet(), _A3_foo_get = function _A3_foo_get() { return ""; };
class A4 {
    constructor() {
        _A4_instances.add(this);
    }
}
_A4_instances = new WeakSet(), _A4_foo_1 = function _A4_foo_1() { return ""; }, _A4_foo_1 = function _A4_foo_1() { return ""; };
class A5 {
    constructor() {
        _A5_instances.add(this);
    }
}
_A5_instances = new WeakSet(), _A5_foo_get = function _A5_foo_get() { return ""; };
class A6 {
    constructor() {
        _A6_instances.add(this);
    }
}
_A6_foo = new WeakMap(), _A6_instances = new WeakSet(), _A6_foo_get = function _A6_foo_get() { return ""; };
class A7 {
    constructor() {
        _A7_instances.add(this);
    }
}
_A7_instances = new WeakSet(), _A7_foo_get_1 = function _A7_foo_get_1() { return ""; }, _A7_foo_get_1 = function _A7_foo_get_1() { return ""; };
class A8 {
    constructor() {
        _A8_instances.add(this);
    }
}
_A8_instances = new WeakSet(), _A8_foo_set_1 = function _A8_foo_set_1(a) { }, _A8_foo_set_1 = function _A8_foo_set_1(a) { };
class A9 {
    constructor() {
        _A9_instances.add(this);
    }
}
_A9_instances = new WeakSet(), _A9_foo_get_1 = function _A9_foo_get_1() { return ""; }, _A9_foo_set_1 = function _A9_foo_set_1(a) { }, _A9_foo_get_1 = function _A9_foo_get_1() { return ""; }, _A9_foo_set_1 = function _A9_foo_set_1(a) { };

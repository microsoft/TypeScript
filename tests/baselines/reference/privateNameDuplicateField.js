//// [privateNameDuplicateField.ts]
function Field() {

    // Error
    class A_Field_Field {
        #foo = "foo";
        #foo = "foo";
    }

    // Error
    class A_Field_Method {
        #foo = "foo";
        #foo() { }
    }

    // Error
    class A_Field_Getter {
        #foo = "foo";
        get #foo() { return ""}
    }

    // Error
    class A_Field_Setter {
        #foo = "foo";
        set #foo(value: string) { }
    }

    // Error
    class A_Field_StaticField {
        #foo = "foo";
        static #foo = "foo";
    }

    // Error
    class A_Field_StaticMethod {
        #foo = "foo";
        static #foo() { }
    }

    // Error
    class A_Field_StaticGetter {
        #foo = "foo";
        static get #foo() { return ""}
    }

    // Error
    class A_Field_StaticSetter {
        #foo = "foo";
        static set #foo(value: string) { }
    }
}

function Method() {
    // Error
    class A_Method_Field {
        #foo() { }
        #foo = "foo";
    }

    // Error
    class A_Method_Method {
        #foo() { }
        #foo() { }
    }

    // Error
    class A_Method_Getter {
        #foo() { }
        get #foo() { return ""}
    }

    // Error
    class A_Method_Setter {
        #foo() { }
        set #foo(value: string) { }
    }

    // Error
    class A_Method_StaticField {
        #foo() { }
        static #foo = "foo";
    }

    // Error
    class A_Method_StaticMethod {
        #foo() { }
        static #foo() { }
    }

    // Error
    class A_Method_StaticGetter {
        #foo() { }
        static get #foo() { return ""}
    }

    // Error
    class A_Method_StaticSetter {
        #foo() { }
        static set #foo(value: string) { }
    }
}


function Getter() {
    // Error
    class A_Getter_Field {
        get #foo() { return ""}
        #foo = "foo";
    }

    // Error
    class A_Getter_Method {
        get #foo() { return ""}
        #foo() { }
    }

    // Error
    class A_Getter_Getter {
        get #foo() { return ""}
        get #foo() { return ""}
    }

    //OK
    class A_Getter_Setter {
        get #foo() { return ""}
        set #foo(value: string) { }
    }

    // Error
    class A_Getter_StaticField {
        get #foo() { return ""}
        static #foo() { }
    }

    // Error
    class A_Getter_StaticMethod {
        get #foo() { return ""}
        static #foo() { }
    }

    // Error
    class A_Getter_StaticGetter {
        get #foo() { return ""}
        static get #foo() { return ""}
    }

    // Error
    class A_Getter_StaticSetter {
        get #foo() { return ""}
        static set #foo(value: string) { }
    }
}

function Setter() {
    // Error
    class A_Setter_Field {
        set #foo(value: string) { }
        #foo = "foo";
    }

    // Error
    class A_Setter_Method {
        set #foo(value: string) { }
        #foo() { }
    }

    // OK
    class A_Setter_Getter {
        set #foo(value: string) { }
        get #foo() { return ""}
    }

    // Error
    class A_Setter_Setter {
        set #foo(value: string) { }
        set #foo(value: string) { }
    }

    // Error
    class A_Setter_StaticField {
        set #foo(value: string) { }
        static #foo = "foo";
    }

    // Error
    class A_Setter_StaticMethod {
        set #foo(value: string) { }
        static #foo() { }
    }

    // Error
    class A_Setter_StaticGetter {
        set #foo(value: string) { }
        static get #foo() { return ""}
    }

    // Error
    class A_Setter_StaticSetter {
        set #foo(value: string) { }
        static set #foo(value: string) { }
    }
}

function StaticField() {
    // Error
    class A_StaticField_Field {
        static #foo = "foo";
        #foo = "foo";
    }

    // Error
    class A_StaticField_Method {
        static #foo = "foo";
        #foo() { }
    }

    // Error
    class A_StaticField_Getter {
        static #foo = "foo";
        get #foo() { return ""}
    }

    // Error
    class A_StaticField_Setter {
        static #foo = "foo";
        set #foo(value: string) { }
    }

    // Error
    class A_StaticField_StaticField {
        static #foo = "foo";
        static #foo = "foo";
    }

    // Error
    class A_StaticField_StaticMethod {
        static #foo = "foo";
        static #foo() { }
    }

    // Error
    class A_StaticField_StaticGetter {
        static #foo = "foo";
        static get #foo() { return ""}
    }

    // Error
    class A_StaticField_StaticSetter {
        static #foo = "foo";
        static set #foo(value: string) { }
    }
}

function StaticMethod() {
    // Error
    class A_StaticMethod_Field {
        static #foo() { }
        #foo = "foo";
    }

    // Error
    class A_StaticMethod_Method {
        static #foo() { }
        #foo() { }
    }

    // Error
    class A_StaticMethod_Getter {
        static #foo() { }
        get #foo() { return ""}
    }

    // Error
    class A_StaticMethod_Setter {
        static #foo() { }
        set #foo(value: string) { }
    }

    // Error
    class A_StaticMethod_StaticField {
        static #foo() { }
        static #foo = "foo";
    }

    // Error
    class A_StaticMethod_StaticMethod {
        static #foo() { }
        static #foo() { }
    }

    // Error
    class A_StaticMethod_StaticGetter {
        static #foo() { }
        static get #foo() { return ""}
    }

    // Error
    class A_StaticMethod_StaticSetter {
        static #foo() { }
        static set #foo(value: string) { }
    }
}

function StaticGetter() {

    // Error
    class A_StaticGetter_Field {
        static get #foo() { return ""}
        #foo = "foo";
    }

    // Error
    class A_StaticGetter_Method {
        static get #foo() { return ""}
        #foo() { }
    }

    // Error
    class A_StaticGetter_Getter {
        static get #foo() { return ""}
        get #foo() { return ""}
    }

    // Error
    class A_StaticGetter_Setter {
        static get #foo() { return ""}
        set #foo(value: string) { }
    }

    // Error
    class A_StaticGetter_StaticField {
        static get #foo() { return ""}
        static #foo() { }
    }

    // Error
    class A_StaticGetter_StaticMethod {
        static get #foo() { return ""}
        static #foo() { }
    }

    // Error
    class A_StaticGetter_StaticGetter {
        static get #foo() { return ""}
        static get #foo() { return ""}
    }
    // OK
    class A_StaticGetter_StaticSetter {
        static get #foo() { return ""}
        static set #foo(value: string) { }
    }
}

function StaticSetter() {
    // Error
    class A_StaticSetter_Field {
        static set #foo(value: string) { }
        #foo = "foo";
    }

    // Error
    class A_StaticSetter_Method {
        static set #foo(value: string) { }
        #foo() { }
    }


    // Error
    class A_StaticSetter_Getter {
        static set #foo(value: string) { }
        get #foo() { return ""}
    }

    // Error
    class A_StaticSetter_Setter {
        static set #foo(value: string) { }
        set #foo(value: string) { }
    }

    // Error
    class A_StaticSetter_StaticField {
        static set #foo(value: string) { }
        static #foo = "foo";
    }

    // Error
    class A_StaticSetter_StaticMethod {
        static set #foo(value: string) { }
        static #foo() { }
    }

    // OK
    class A_StaticSetter_StaticGetter {
        static set #foo(value: string) { }
        static get #foo() { return ""}
    }

    // Error
    class A_StaticSetter_StaticSetter {
        static set #foo(value: string) { }
        static set #foo(value: string) { }
    }
}


//// [privateNameDuplicateField.js]
"use strict";
function Field() {
    var _A_Field_Field_foo, _A_Field_Field_foo_1, _A_Field_Method_instances, _A_Field_Method_foo, _A_Field_Method_foo_1, _A_Field_Getter_instances, _A_Field_Getter_foo, _A_Field_Getter_foo_get, _A_Field_Setter_instances, _A_Field_Setter_foo, _A_Field_Setter_foo_set, _A_Field_StaticField_foo, _A_Field_StaticField_foo_1, _A_Field_StaticMethod_foo, _A_Field_StaticMethod_foo_1, _A_Field_StaticGetter_foo, _A_Field_StaticGetter_foo_get, _A_Field_StaticSetter_foo, _A_Field_StaticSetter_foo_set;
    // Error
    class A_Field_Field {
        constructor() {
            _A_Field_Field_foo_1.set(this, "foo");
            _A_Field_Field_foo_1.set(this, "foo");
        }
    }
    _A_Field_Field_foo = new WeakMap(), _A_Field_Field_foo_1 = new WeakMap();
    // Error
    class A_Field_Method {
        constructor() {
            _A_Field_Method_instances.add(this);
        }
    }
    _A_Field_Method_foo = new WeakMap(), _A_Field_Method_instances = new WeakSet(), _A_Field_Method_foo_1 = function _A_Field_Method_foo_1() { };
    // Error
    class A_Field_Getter {
        constructor() {
            _A_Field_Getter_instances.add(this);
        }
    }
    _A_Field_Getter_foo = new WeakMap(), _A_Field_Getter_instances = new WeakSet(), _A_Field_Getter_foo_get = function _A_Field_Getter_foo_get() { return ""; };
    // Error
    class A_Field_Setter {
        constructor() {
            _A_Field_Setter_instances.add(this);
        }
    }
    _A_Field_Setter_foo = new WeakMap(), _A_Field_Setter_instances = new WeakSet(), _A_Field_Setter_foo_set = function _A_Field_Setter_foo_set(value) { };
    // Error
    class A_Field_StaticField {
        constructor() {
            _A_Field_StaticField_foo_1 = { value: "foo" };
        }
    }
    _A_Field_StaticField_foo = new WeakMap();
    _A_Field_StaticField_foo_1 = { value: "foo" };
    // Error
    class A_Field_StaticMethod {
        constructor() {
        }
    }
    _A_Field_StaticMethod_foo = new WeakMap(), _A_Field_StaticMethod_foo_1 = function _A_Field_StaticMethod_foo_1() { };
    // Error
    class A_Field_StaticGetter {
        constructor() {
        }
    }
    _A_Field_StaticGetter_foo = new WeakMap(), _A_Field_StaticGetter_foo_get = function _A_Field_StaticGetter_foo_get() { return ""; };
    // Error
    class A_Field_StaticSetter {
        constructor() {
        }
    }
    _A_Field_StaticSetter_foo = new WeakMap(), _A_Field_StaticSetter_foo_set = function _A_Field_StaticSetter_foo_set(value) { };
}
function Method() {
    var _A_Method_Field_instances, _A_Method_Field_foo, _A_Method_Field_foo_1, _A_Method_Method_instances, _A_Method_Method_foo, _A_Method_Method_foo_1, _A_Method_Getter_instances, _A_Method_Getter_foo, _A_Method_Getter_foo_get, _A_Method_Setter_instances, _A_Method_Setter_foo, _A_Method_Setter_foo_set, _A_Method_StaticField_instances, _A_Method_StaticField_foo, _A_Method_StaticField_foo_1, _A_Method_StaticMethod_instances, _A_Method_StaticMethod_foo, _A_Method_StaticMethod_foo_1, _A_Method_StaticGetter_instances, _A_Method_StaticGetter_foo, _A_Method_StaticGetter_foo_get, _A_Method_StaticSetter_instances, _A_Method_StaticSetter_foo, _A_Method_StaticSetter_foo_set;
    // Error
    class A_Method_Field {
        constructor() {
            _A_Method_Field_instances.add(this);
            _A_Method_Field_foo_1.set(this, "foo");
        }
    }
    _A_Method_Field_foo_1 = new WeakMap(), _A_Method_Field_instances = new WeakSet();
    // Error
    class A_Method_Method {
        constructor() {
            _A_Method_Method_instances.add(this);
        }
    }
    _A_Method_Method_instances = new WeakSet(), _A_Method_Method_foo_1 = function _A_Method_Method_foo_1() { }, _A_Method_Method_foo_1 = function _A_Method_Method_foo_1() { };
    // Error
    class A_Method_Getter {
        constructor() {
            _A_Method_Getter_instances.add(this);
        }
    }
    _A_Method_Getter_instances = new WeakSet(), _A_Method_Getter_foo_get = function _A_Method_Getter_foo_get() { return ""; };
    // Error
    class A_Method_Setter {
        constructor() {
            _A_Method_Setter_instances.add(this);
        }
    }
    _A_Method_Setter_instances = new WeakSet(), _A_Method_Setter_foo_set = function _A_Method_Setter_foo_set(value) { };
    // Error
    class A_Method_StaticField {
        constructor() {
            _A_Method_StaticField_instances.add(this);
        }
    }
    _A_Method_StaticField_instances = new WeakSet();
    _A_Method_StaticField_foo_1 = { value: "foo" };
    // Error
    class A_Method_StaticMethod {
        constructor() {
            _A_Method_StaticMethod_instances.add(this);
        }
    }
    _A_Method_StaticMethod_instances = new WeakSet(), _A_Method_StaticMethod_foo_1 = function _A_Method_StaticMethod_foo_1() { }, _A_Method_StaticMethod_foo_1 = function _A_Method_StaticMethod_foo_1() { };
    // Error
    class A_Method_StaticGetter {
        constructor() {
            _A_Method_StaticGetter_instances.add(this);
        }
    }
    _A_Method_StaticGetter_instances = new WeakSet(), _A_Method_StaticGetter_foo_get = function _A_Method_StaticGetter_foo_get() { return ""; };
    // Error
    class A_Method_StaticSetter {
        constructor() {
            _A_Method_StaticSetter_instances.add(this);
        }
    }
    _A_Method_StaticSetter_instances = new WeakSet(), _A_Method_StaticSetter_foo_set = function _A_Method_StaticSetter_foo_set(value) { };
}
function Getter() {
    var _A_Getter_Field_instances, _A_Getter_Field_foo_get, _A_Getter_Field_foo, _A_Getter_Method_instances, _A_Getter_Method_foo_get, _A_Getter_Method_foo, _A_Getter_Getter_instances, _A_Getter_Getter_foo_get, _A_Getter_Getter_foo_get_1, _A_Getter_Setter_instances, _A_Getter_Setter_foo_get, _A_Getter_Setter_foo_set, _A_Getter_StaticField_instances, _A_Getter_StaticField_foo_get, _A_Getter_StaticField_foo, _A_Getter_StaticMethod_instances, _A_Getter_StaticMethod_foo_get, _A_Getter_StaticMethod_foo, _A_Getter_StaticGetter_instances, _A_Getter_StaticGetter_foo_get, _A_Getter_StaticGetter_foo_get_1, _A_Getter_StaticSetter_instances, _A_Getter_StaticSetter_foo_get, _A_Getter_StaticSetter_foo_set;
    // Error
    class A_Getter_Field {
        constructor() {
            _A_Getter_Field_instances.add(this);
            _A_Getter_Field_foo.set(this, "foo");
        }
    }
    _A_Getter_Field_foo = new WeakMap(), _A_Getter_Field_instances = new WeakSet();
    // Error
    class A_Getter_Method {
        constructor() {
            _A_Getter_Method_instances.add(this);
        }
    }
    _A_Getter_Method_instances = new WeakSet(), _A_Getter_Method_foo = function _A_Getter_Method_foo() { return ""; }, _A_Getter_Method_foo = function _A_Getter_Method_foo() { };
    // Error
    class A_Getter_Getter {
        constructor() {
            _A_Getter_Getter_instances.add(this);
        }
    }
    _A_Getter_Getter_instances = new WeakSet(), _A_Getter_Getter_foo_get_1 = function _A_Getter_Getter_foo_get_1() { return ""; }, _A_Getter_Getter_foo_get_1 = function _A_Getter_Getter_foo_get_1() { return ""; };
    //OK
    class A_Getter_Setter {
        constructor() {
            _A_Getter_Setter_instances.add(this);
        }
    }
    _A_Getter_Setter_instances = new WeakSet(), _A_Getter_Setter_foo_get = function _A_Getter_Setter_foo_get() { return ""; }, _A_Getter_Setter_foo_set = function _A_Getter_Setter_foo_set(value) { };
    // Error
    class A_Getter_StaticField {
        constructor() {
            _A_Getter_StaticField_instances.add(this);
        }
    }
    _A_Getter_StaticField_instances = new WeakSet(), _A_Getter_StaticField_foo = function _A_Getter_StaticField_foo() { return ""; }, _A_Getter_StaticField_foo = function _A_Getter_StaticField_foo() { };
    // Error
    class A_Getter_StaticMethod {
        constructor() {
            _A_Getter_StaticMethod_instances.add(this);
        }
    }
    _A_Getter_StaticMethod_instances = new WeakSet(), _A_Getter_StaticMethod_foo = function _A_Getter_StaticMethod_foo() { return ""; }, _A_Getter_StaticMethod_foo = function _A_Getter_StaticMethod_foo() { };
    // Error
    class A_Getter_StaticGetter {
        constructor() {
            _A_Getter_StaticGetter_instances.add(this);
        }
    }
    _A_Getter_StaticGetter_instances = new WeakSet(), _A_Getter_StaticGetter_foo_get_1 = function _A_Getter_StaticGetter_foo_get_1() { return ""; }, _A_Getter_StaticGetter_foo_get_1 = function _A_Getter_StaticGetter_foo_get_1() { return ""; };
    // Error
    class A_Getter_StaticSetter {
        constructor() {
            _A_Getter_StaticSetter_instances.add(this);
        }
    }
    _A_Getter_StaticSetter_instances = new WeakSet(), _A_Getter_StaticSetter_foo_set = function _A_Getter_StaticSetter_foo_set(value) { };
}
function Setter() {
    var _A_Setter_Field_instances, _A_Setter_Field_foo_set, _A_Setter_Field_foo, _A_Setter_Method_instances, _A_Setter_Method_foo_set, _A_Setter_Method_foo, _A_Setter_Getter_instances, _A_Setter_Getter_foo_set, _A_Setter_Getter_foo_get, _A_Setter_Setter_instances, _A_Setter_Setter_foo_set, _A_Setter_Setter_foo_set_1, _A_Setter_StaticField_instances, _A_Setter_StaticField_foo_set, _A_Setter_StaticField_foo, _A_Setter_StaticMethod_instances, _A_Setter_StaticMethod_foo_set, _A_Setter_StaticMethod_foo, _A_Setter_StaticGetter_instances, _A_Setter_StaticGetter_foo_set, _A_Setter_StaticGetter_foo_get, _A_Setter_StaticSetter_instances, _A_Setter_StaticSetter_foo_set, _A_Setter_StaticSetter_foo_set_1;
    // Error
    class A_Setter_Field {
        constructor() {
            _A_Setter_Field_instances.add(this);
            _A_Setter_Field_foo.set(this, "foo");
        }
    }
    _A_Setter_Field_foo = new WeakMap(), _A_Setter_Field_instances = new WeakSet();
    // Error
    class A_Setter_Method {
        constructor() {
            _A_Setter_Method_instances.add(this);
        }
    }
    _A_Setter_Method_instances = new WeakSet(), _A_Setter_Method_foo = function _A_Setter_Method_foo(value) { }, _A_Setter_Method_foo = function _A_Setter_Method_foo() { };
    // OK
    class A_Setter_Getter {
        constructor() {
            _A_Setter_Getter_instances.add(this);
        }
    }
    _A_Setter_Getter_instances = new WeakSet(), _A_Setter_Getter_foo_set = function _A_Setter_Getter_foo_set(value) { }, _A_Setter_Getter_foo_get = function _A_Setter_Getter_foo_get() { return ""; };
    // Error
    class A_Setter_Setter {
        constructor() {
            _A_Setter_Setter_instances.add(this);
        }
    }
    _A_Setter_Setter_instances = new WeakSet(), _A_Setter_Setter_foo_set_1 = function _A_Setter_Setter_foo_set_1(value) { }, _A_Setter_Setter_foo_set_1 = function _A_Setter_Setter_foo_set_1(value) { };
    // Error
    class A_Setter_StaticField {
        constructor() {
            _A_Setter_StaticField_instances.add(this);
        }
    }
    _A_Setter_StaticField_instances = new WeakSet();
    _A_Setter_StaticField_foo = { value: "foo" };
    // Error
    class A_Setter_StaticMethod {
        constructor() {
            _A_Setter_StaticMethod_instances.add(this);
        }
    }
    _A_Setter_StaticMethod_instances = new WeakSet(), _A_Setter_StaticMethod_foo = function _A_Setter_StaticMethod_foo(value) { }, _A_Setter_StaticMethod_foo = function _A_Setter_StaticMethod_foo() { };
    // Error
    class A_Setter_StaticGetter {
        constructor() {
            _A_Setter_StaticGetter_instances.add(this);
        }
    }
    _A_Setter_StaticGetter_instances = new WeakSet(), _A_Setter_StaticGetter_foo_get = function _A_Setter_StaticGetter_foo_get() { return ""; };
    // Error
    class A_Setter_StaticSetter {
        constructor() {
            _A_Setter_StaticSetter_instances.add(this);
        }
    }
    _A_Setter_StaticSetter_instances = new WeakSet(), _A_Setter_StaticSetter_foo_set_1 = function _A_Setter_StaticSetter_foo_set_1(value) { }, _A_Setter_StaticSetter_foo_set_1 = function _A_Setter_StaticSetter_foo_set_1(value) { };
}
function StaticField() {
    var _A_StaticField_Field_foo, _A_StaticField_Field_foo_1, _A_StaticField_Method_instances, _A_StaticField_Method_foo, _A_StaticField_Method_foo_1, _A_StaticField_Getter_instances, _A_StaticField_Getter_foo, _A_StaticField_Getter_foo_get, _A_StaticField_Setter_instances, _A_StaticField_Setter_foo, _A_StaticField_Setter_foo_set, _A_StaticField_StaticField_foo, _A_StaticField_StaticField_foo_1, _A_StaticField_StaticMethod_foo, _A_StaticField_StaticMethod_foo_1, _A_StaticField_StaticGetter_foo, _A_StaticField_StaticGetter_foo_get, _A_StaticField_StaticSetter_foo, _A_StaticField_StaticSetter_foo_set;
    // Error
    class A_StaticField_Field {
        constructor() {
            _A_StaticField_Field_foo_1.set(this, "foo");
        }
    }
    _A_StaticField_Field_foo_1 = new WeakMap();
    _A_StaticField_Field_foo_1.set(A_StaticField_Field, "foo");
    // Error
    class A_StaticField_Method {
        constructor() {
            _A_StaticField_Method_instances.add(this);
        }
    }
    _A_StaticField_Method_instances = new WeakSet(), _A_StaticField_Method_foo_1 = function _A_StaticField_Method_foo_1() { };
    // Error
    class A_StaticField_Getter {
        constructor() {
            _A_StaticField_Getter_instances.add(this);
        }
    }
    _A_StaticField_Getter_instances = new WeakSet(), _A_StaticField_Getter_foo_get = function _A_StaticField_Getter_foo_get() { return ""; };
    // Error
    class A_StaticField_Setter {
        constructor() {
            _A_StaticField_Setter_instances.add(this);
        }
    }
    _A_StaticField_Setter_instances = new WeakSet(), _A_StaticField_Setter_foo_set = function _A_StaticField_Setter_foo_set(value) { };
    // Error
    class A_StaticField_StaticField {
    }
    _A_StaticField_StaticField_foo_1 = { value: "foo" };
    _A_StaticField_StaticField_foo_1 = { value: "foo" };
    // Error
    class A_StaticField_StaticMethod {
    }
    _A_StaticField_StaticMethod_foo_1 = function _A_StaticField_StaticMethod_foo_1() { };
    // Error
    class A_StaticField_StaticGetter {
    }
    _A_StaticField_StaticGetter_foo_get = function _A_StaticField_StaticGetter_foo_get() { return ""; };
    // Error
    class A_StaticField_StaticSetter {
    }
    _A_StaticField_StaticSetter_foo_set = function _A_StaticField_StaticSetter_foo_set(value) { };
}
function StaticMethod() {
    var _A_StaticMethod_Field_foo, _A_StaticMethod_Field_foo_1, _A_StaticMethod_Method_instances, _A_StaticMethod_Method_foo, _A_StaticMethod_Method_foo_1, _A_StaticMethod_Getter_instances, _A_StaticMethod_Getter_foo, _A_StaticMethod_Getter_foo_get, _A_StaticMethod_Setter_instances, _A_StaticMethod_Setter_foo, _A_StaticMethod_Setter_foo_set, _A_StaticMethod_StaticField_foo, _A_StaticMethod_StaticField_foo_1, _A_StaticMethod_StaticMethod_foo, _A_StaticMethod_StaticMethod_foo_1, _A_StaticMethod_StaticGetter_foo, _A_StaticMethod_StaticGetter_foo_get, _A_StaticMethod_StaticSetter_foo, _A_StaticMethod_StaticSetter_foo_set;
    // Error
    class A_StaticMethod_Field {
        constructor() {
            _A_StaticMethod_Field_foo_1.set(this, "foo");
        }
    }
    _A_StaticMethod_Field_foo_1 = new WeakMap();
    // Error
    class A_StaticMethod_Method {
        constructor() {
            _A_StaticMethod_Method_instances.add(this);
        }
    }
    _A_StaticMethod_Method_instances = new WeakSet(), _A_StaticMethod_Method_foo_1 = function _A_StaticMethod_Method_foo_1() { }, _A_StaticMethod_Method_foo_1 = function _A_StaticMethod_Method_foo_1() { };
    // Error
    class A_StaticMethod_Getter {
        constructor() {
            _A_StaticMethod_Getter_instances.add(this);
        }
    }
    _A_StaticMethod_Getter_instances = new WeakSet(), _A_StaticMethod_Getter_foo_get = function _A_StaticMethod_Getter_foo_get() { return ""; };
    // Error
    class A_StaticMethod_Setter {
        constructor() {
            _A_StaticMethod_Setter_instances.add(this);
        }
    }
    _A_StaticMethod_Setter_instances = new WeakSet(), _A_StaticMethod_Setter_foo_set = function _A_StaticMethod_Setter_foo_set(value) { };
    // Error
    class A_StaticMethod_StaticField {
    }
    _A_StaticMethod_StaticField_foo_1 = { value: "foo" };
    // Error
    class A_StaticMethod_StaticMethod {
    }
    _A_StaticMethod_StaticMethod_foo_1 = function _A_StaticMethod_StaticMethod_foo_1() { }, _A_StaticMethod_StaticMethod_foo_1 = function _A_StaticMethod_StaticMethod_foo_1() { };
    // Error
    class A_StaticMethod_StaticGetter {
    }
    _A_StaticMethod_StaticGetter_foo_get = function _A_StaticMethod_StaticGetter_foo_get() { return ""; };
    // Error
    class A_StaticMethod_StaticSetter {
    }
    _A_StaticMethod_StaticSetter_foo_set = function _A_StaticMethod_StaticSetter_foo_set(value) { };
}
function StaticGetter() {
    var _A_StaticGetter_Field_foo_get, _A_StaticGetter_Field_foo, _A_StaticGetter_Method_instances, _A_StaticGetter_Method_foo_get, _A_StaticGetter_Method_foo, _A_StaticGetter_Getter_instances, _A_StaticGetter_Getter_foo_get, _A_StaticGetter_Getter_foo_get_1, _A_StaticGetter_Setter_instances, _A_StaticGetter_Setter_foo_get, _A_StaticGetter_Setter_foo_set, _A_StaticGetter_StaticField_foo_get, _A_StaticGetter_StaticField_foo, _A_StaticGetter_StaticMethod_foo_get, _A_StaticGetter_StaticMethod_foo, _A_StaticGetter_StaticGetter_foo_get, _A_StaticGetter_StaticGetter_foo_get_1, _A_StaticGetter_StaticSetter_foo_get, _A_StaticGetter_StaticSetter_foo_set;
    // Error
    class A_StaticGetter_Field {
        constructor() {
            _A_StaticGetter_Field_foo.set(this, "foo");
        }
    }
    _A_StaticGetter_Field_foo = new WeakMap();
    // Error
    class A_StaticGetter_Method {
        constructor() {
            _A_StaticGetter_Method_instances.add(this);
        }
    }
    _A_StaticGetter_Method_instances = new WeakSet(), _A_StaticGetter_Method_foo = function _A_StaticGetter_Method_foo() { return ""; }, _A_StaticGetter_Method_foo = function _A_StaticGetter_Method_foo() { };
    // Error
    class A_StaticGetter_Getter {
        constructor() {
            _A_StaticGetter_Getter_instances.add(this);
        }
    }
    _A_StaticGetter_Getter_instances = new WeakSet(), _A_StaticGetter_Getter_foo_get_1 = function _A_StaticGetter_Getter_foo_get_1() { return ""; }, _A_StaticGetter_Getter_foo_get_1 = function _A_StaticGetter_Getter_foo_get_1() { return ""; };
    // Error
    class A_StaticGetter_Setter {
        constructor() {
            _A_StaticGetter_Setter_instances.add(this);
        }
    }
    _A_StaticGetter_Setter_instances = new WeakSet(), _A_StaticGetter_Setter_foo_set = function _A_StaticGetter_Setter_foo_set(value) { };
    // Error
    class A_StaticGetter_StaticField {
    }
    _A_StaticGetter_StaticField_foo = function _A_StaticGetter_StaticField_foo() { return ""; }, _A_StaticGetter_StaticField_foo = function _A_StaticGetter_StaticField_foo() { };
    // Error
    class A_StaticGetter_StaticMethod {
    }
    _A_StaticGetter_StaticMethod_foo = function _A_StaticGetter_StaticMethod_foo() { return ""; }, _A_StaticGetter_StaticMethod_foo = function _A_StaticGetter_StaticMethod_foo() { };
    // Error
    class A_StaticGetter_StaticGetter {
    }
    _A_StaticGetter_StaticGetter_foo_get_1 = function _A_StaticGetter_StaticGetter_foo_get_1() { return ""; }, _A_StaticGetter_StaticGetter_foo_get_1 = function _A_StaticGetter_StaticGetter_foo_get_1() { return ""; };
    // OK
    class A_StaticGetter_StaticSetter {
    }
    _A_StaticGetter_StaticSetter_foo_get = function _A_StaticGetter_StaticSetter_foo_get() { return ""; }, _A_StaticGetter_StaticSetter_foo_set = function _A_StaticGetter_StaticSetter_foo_set(value) { };
}
function StaticSetter() {
    var _A_StaticSetter_Field_foo_set, _A_StaticSetter_Field_foo, _A_StaticSetter_Method_instances, _A_StaticSetter_Method_foo_set, _A_StaticSetter_Method_foo, _A_StaticSetter_Getter_instances, _A_StaticSetter_Getter_foo_set, _A_StaticSetter_Getter_foo_get, _A_StaticSetter_Setter_instances, _A_StaticSetter_Setter_foo_set, _A_StaticSetter_Setter_foo_set_1, _A_StaticSetter_StaticField_foo_set, _A_StaticSetter_StaticField_foo, _A_StaticSetter_StaticMethod_foo_set, _A_StaticSetter_StaticMethod_foo, _A_StaticSetter_StaticGetter_foo_set, _A_StaticSetter_StaticGetter_foo_get, _A_StaticSetter_StaticSetter_foo_set, _A_StaticSetter_StaticSetter_foo_set_1;
    // Error
    class A_StaticSetter_Field {
        constructor() {
            _A_StaticSetter_Field_foo.set(this, "foo");
        }
    }
    _A_StaticSetter_Field_foo = new WeakMap();
    // Error
    class A_StaticSetter_Method {
        constructor() {
            _A_StaticSetter_Method_instances.add(this);
        }
    }
    _A_StaticSetter_Method_instances = new WeakSet(), _A_StaticSetter_Method_foo = function _A_StaticSetter_Method_foo(value) { }, _A_StaticSetter_Method_foo = function _A_StaticSetter_Method_foo() { };
    // Error
    class A_StaticSetter_Getter {
        constructor() {
            _A_StaticSetter_Getter_instances.add(this);
        }
    }
    _A_StaticSetter_Getter_instances = new WeakSet(), _A_StaticSetter_Getter_foo_get = function _A_StaticSetter_Getter_foo_get() { return ""; };
    // Error
    class A_StaticSetter_Setter {
        constructor() {
            _A_StaticSetter_Setter_instances.add(this);
        }
    }
    _A_StaticSetter_Setter_instances = new WeakSet(), _A_StaticSetter_Setter_foo_set_1 = function _A_StaticSetter_Setter_foo_set_1(value) { }, _A_StaticSetter_Setter_foo_set_1 = function _A_StaticSetter_Setter_foo_set_1(value) { };
    // Error
    class A_StaticSetter_StaticField {
    }
    _A_StaticSetter_StaticField_foo = { value: "foo" };
    // Error
    class A_StaticSetter_StaticMethod {
    }
    _A_StaticSetter_StaticMethod_foo = function _A_StaticSetter_StaticMethod_foo(value) { }, _A_StaticSetter_StaticMethod_foo = function _A_StaticSetter_StaticMethod_foo() { };
    // OK
    class A_StaticSetter_StaticGetter {
    }
    _A_StaticSetter_StaticGetter_foo_set = function _A_StaticSetter_StaticGetter_foo_set(value) { }, _A_StaticSetter_StaticGetter_foo_get = function _A_StaticSetter_StaticGetter_foo_get() { return ""; };
    // Error
    class A_StaticSetter_StaticSetter {
    }
    _A_StaticSetter_StaticSetter_foo_set_1 = function _A_StaticSetter_StaticSetter_foo_set_1(value) { }, _A_StaticSetter_StaticSetter_foo_set_1 = function _A_StaticSetter_StaticSetter_foo_set_1(value) { };
}

//// [privateNameClassExpressionLoop.ts]
const array = [];
for (let i = 0; i < 10; ++i) {
    array.push(class C {
        #myField = "hello";
        #method() {}
        get #accessor() { return 42; }
        set #accessor(val) { }
    });
}


//// [privateNameClassExpressionLoop.js]
var _a;
const array = [];
for (let i = 0; i < 10; ++i) {
    let _C_instances, _C_myField, _C_method, _C_accessor_get, _C_accessor_set;
    array.push((_a = class C {
            constructor() {
                _C_instances.add(this);
                _C_myField.set(this, "hello");
            }
        },
        _C_myField = new WeakMap(),
        _C_instances = new WeakSet(),
        _C_method = function _C_method() { },
        _C_accessor_get = function _C_accessor_get() { return 42; },
        _C_accessor_set = function _C_accessor_set(val) { },
        _a));
}

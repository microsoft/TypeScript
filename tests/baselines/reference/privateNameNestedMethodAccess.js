//// [privateNameNestedMethodAccess.ts]
class C {
    #foo = 42;
    #bar() { new C().#baz; }
    get #baz() { return 42; }

    m() {
        return class D {
            #bar() {}
            constructor() {
                new C().#foo;
                new C().#bar; // Error
                new C().#baz;
                new D().#bar;
            }

            n(x: any) {
                x.#foo;
                x.#bar;
                x.#unknown; // Error
            }
        }
    }
}


//// [privateNameNestedMethodAccess.js]
var __classPrivateAccessorGet = (this && this.__classPrivateAccessorGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private accessor on non-instance");
    }
    return fn.call(receiver);
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _C_instances, _C_foo, _C_bar, _C_baz_get;
class C {
    constructor() {
        _C_instances.add(this);
        _C_foo.set(this, 42);
    }
    m() {
        var _D_instances, _D_bar, _a;
        return _a = class D {
                constructor() {
                    _D_instances.add(this);
                    __classPrivateFieldGet(new C(), _C_foo);
                    __classPrivateMethodGet(new C(), _D_instances, _D_bar); // Error
                    __classPrivateAccessorGet(new C(), _C_instances, _C_baz_get);
                    __classPrivateMethodGet(new D(), _D_instances, _D_bar);
                }
                n(x) {
                    __classPrivateFieldGet(x, _C_foo);
                    __classPrivateMethodGet(x, _D_instances, _D_bar);
                    x.; // Error
                }
            },
            _D_instances = new WeakSet(),
            _D_bar = function _D_bar() { },
            _a;
    }
}
_C_foo = new WeakMap(), _C_instances = new WeakSet(), _C_bar = function _C_bar() { __classPrivateAccessorGet(new C(), _C_instances, _C_baz_get); }, _C_baz_get = function _C_baz_get() { return 42; };

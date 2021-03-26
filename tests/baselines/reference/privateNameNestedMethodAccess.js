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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
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
                    __classPrivateFieldGet(new C(), _C_foo, "f");
                    __classPrivateFieldGet(new C(), _D_instances, "m", _D_bar); // Error
                    __classPrivateFieldGet(new C(), _C_instances, "a", _C_baz_get);
                    __classPrivateFieldGet(new D(), _D_instances, "m", _D_bar);
                }
                n(x) {
                    __classPrivateFieldGet(x, _C_foo, "f");
                    __classPrivateFieldGet(x, _D_instances, "m", _D_bar);
                    x.; // Error
                }
            },
            _D_instances = new WeakSet(),
            _D_bar = function _D_bar() { },
            _a;
    }
}
_C_foo = new WeakMap(), _C_instances = new WeakSet(), _C_bar = function _C_bar() { __classPrivateFieldGet(new C(), _C_instances, "a", _C_baz_get); }, _C_baz_get = function _C_baz_get() { return 42; };

//// [tests/cases/conformance/classes/members/privateNames/privateNameNestedClassFieldShadowing.ts] ////

//// [privateNameNestedClassFieldShadowing.ts]
class Base {
    #x;
    constructor() {
        class Derived {
            #x;
            testBase(x: Base) {
                console.log(x.#x);
            }
            testDerived(x: Derived) {
                console.log(x.#x);
            }
        }
    }
}


//// [privateNameNestedClassFieldShadowing.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Base_x;
class Base {
    constructor() {
        var _Derived_x;
        _Base_x.set(this, void 0);
        class Derived {
            constructor() {
                _Derived_x.set(this, void 0);
            }
            testBase(x) {
                console.log(__classPrivateFieldGet(x, _Derived_x, "f"));
            }
            testDerived(x) {
                console.log(__classPrivateFieldGet(x, _Derived_x, "f"));
            }
        }
        _Derived_x = new WeakMap();
    }
}
_Base_x = new WeakMap();

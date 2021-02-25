//// [privateNameErrorsOnNotUseDefineForClassFieldsInEsNext.ts]
class Test {
    #prop = 0 
    static dd = new Test().#prop; // Err
    static ["X_ z_ zz"] = class Inner {
        #foo  = 10   
        m() {
            new Test().#prop // Err
        }
        static C = class InnerInner {
            m() {
                new Test().#prop // Err
                new Inner().#foo; // Err
            }
        }

        static M(){
            return class {
                m() {
                    new Test().#prop // Err
                    new Inner().#foo; // OK
                }
            }
        } 
    }
}

//// [privateNameErrorsOnNotUseDefineForClassFieldsInEsNext.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Test_prop, _Inner_foo, _a;
class Test {
    constructor() {
        _Test_prop.set(this, 0);
    }
}
_Test_prop = new WeakMap();
Test.dd = __classPrivateFieldGet(new Test(), _Test_prop, "f"); // Err
Test["X_ z_ zz"] = (_a = class Inner {
        constructor() {
            _Inner_foo.set(this, 10);
        }
        m() {
            __classPrivateFieldGet(new Test(), _Test_prop, "f"); // Err
        }
        static M() {
            return class {
                m() {
                    __classPrivateFieldGet(new Test(), _Test_prop, "f"); // Err
                    __classPrivateFieldGet(new Inner(), _Inner_foo, "f"); // OK
                }
            };
        }
    },
    _Inner_foo = new WeakMap(),
    _a.C = class InnerInner {
        m() {
            __classPrivateFieldGet(new Test(), _Test_prop, "f"); // Err
            __classPrivateFieldGet(new _a(), _Inner_foo, "f"); // Err
        }
    },
    _a);

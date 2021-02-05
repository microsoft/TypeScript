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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _prop, _foo, _a;
class Test {
    constructor() {
        _prop.set(this, 0);
    }
}
_prop = new WeakMap();
Test.dd = __classPrivateFieldGet(new Test(), _prop); // Err
Test["X_ z_ zz"] = (_a = class Inner {
        constructor() {
            _foo.set(this, 10);
        }
        m() {
            __classPrivateFieldGet(new Test(), _prop); // Err
        }
        static M() {
            return class {
                m() {
                    __classPrivateFieldGet(new Test(), _prop); // Err
                    __classPrivateFieldGet(new Inner(), _foo); // OK
                }
            };
        }
    },
    _foo = new WeakMap(),
    _a.C = class InnerInner {
        m() {
            __classPrivateFieldGet(new Test(), _prop); // Err
            __classPrivateFieldGet(new _a(), _foo); // Err
        }
    },
    _a);

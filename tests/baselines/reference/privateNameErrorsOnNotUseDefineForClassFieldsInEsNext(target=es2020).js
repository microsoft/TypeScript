//// [privateNameErrorsOnNotUseDefineForClassFieldsInEsNext.ts]
class TestWithErrors {
    #prop = 0 
    static dd = new TestWithErrors().#prop; // Err
    static ["X_ z_ zz"] = class Inner {
        #foo  = 10   
        m() {
            new TestWithErrors().#prop // Err
        }
        static C = class InnerInner {
            m() {
                new TestWithErrors().#prop // Err
                new Inner().#foo; // Err
            }
        }

        static M(){
            return class {
                m() {
                    new TestWithErrors().#prop // Err
                    new Inner().#foo; // OK
                }
            }
        } 
    }
}

class TestNoErrors {
    #prop = 0 
    dd = new TestNoErrors().#prop; // OK
    ["X_ z_ zz"] = class Inner {
        #foo  = 10   
        m() {
            new TestNoErrors().#prop // Ok
        }
        C = class InnerInner {
            m() {
                new TestNoErrors().#prop // Ok
                new Inner().#foo; // Ok
            }
        }
  
        static M(){
            return class {
                m() {
                    new TestNoErrors().#prop // OK
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
var _TestWithErrors_prop, _Inner_foo, _a, _TestNoErrors_prop;
class TestWithErrors {
    constructor() {
        _TestWithErrors_prop.set(this, 0);
    }
}
_TestWithErrors_prop = new WeakMap();
TestWithErrors.dd = __classPrivateFieldGet(new TestWithErrors(), _TestWithErrors_prop, "f"); // Err
TestWithErrors["X_ z_ zz"] = (_a = class Inner {
        constructor() {
            _Inner_foo.set(this, 10);
        }
        m() {
            __classPrivateFieldGet(new TestWithErrors(), _TestWithErrors_prop, "f"); // Err
        }
        static M() {
            return class {
                m() {
                    __classPrivateFieldGet(new TestWithErrors(), _TestWithErrors_prop, "f"); // Err
                    __classPrivateFieldGet(new Inner(), _Inner_foo, "f"); // OK
                }
            };
        }
    },
    _Inner_foo = new WeakMap(),
    _a.C = class InnerInner {
        m() {
            __classPrivateFieldGet(new TestWithErrors(), _TestWithErrors_prop, "f"); // Err
            __classPrivateFieldGet(new _a(), _Inner_foo, "f"); // Err
        }
    },
    _a);
class TestNoErrors {
    constructor() {
        var _Inner_foo_1, _b;
        _TestNoErrors_prop.set(this, 0);
        this.dd = __classPrivateFieldGet(new TestNoErrors(), _TestNoErrors_prop, "f"); // OK
        this["X_ z_ zz"] = (_b = class Inner {
                constructor() {
                    _Inner_foo_1.set(this, 10);
                    this.C = class InnerInner {
                        m() {
                            __classPrivateFieldGet(new TestNoErrors(), _TestNoErrors_prop, "f"); // Ok
                            __classPrivateFieldGet(new Inner(), _Inner_foo_1, "f"); // Ok
                        }
                    };
                }
                m() {
                    __classPrivateFieldGet(new TestNoErrors(), _TestNoErrors_prop, "f"); // Ok
                }
                static M() {
                    return class {
                        m() {
                            __classPrivateFieldGet(new TestNoErrors(), _TestNoErrors_prop, "f"); // OK
                            __classPrivateFieldGet(new Inner(), _Inner_foo_1, "f"); // OK
                        }
                    };
                }
            },
            _Inner_foo_1 = new WeakMap(),
            _b);
    }
}
_TestNoErrors_prop = new WeakMap();

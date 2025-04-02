//// [tests/cases/conformance/classes/members/privateNames/privateNameWhenNotUseDefineForClassFieldsInEsNext.ts] ////

//// [privateNameWhenNotUseDefineForClassFieldsInEsNext.ts]
class TestWithStatics {
    #prop = 0
    static dd = new TestWithStatics().#prop; // OK
    static ["X_ z_ zz"] = class Inner {
        #foo  = 10
        m() {
            new TestWithStatics().#prop // OK
        }
        static C = class InnerInner {
            m() {
                new TestWithStatics().#prop // OK
                new Inner().#foo; // OK
            }
        }

        static M(){
            return class {
                m() {
                    new TestWithStatics().#prop // OK
                    new Inner().#foo; // OK
                }
            }
        }
    }
}

class TestNonStatics {
    #prop = 0
    dd = new TestNonStatics().#prop; // OK
    ["X_ z_ zz"] = class Inner {
        #foo  = 10
        m() {
            new TestNonStatics().#prop // Ok
        }
        C = class InnerInner {
            m() {
                new TestNonStatics().#prop // Ok
                new Inner().#foo; // Ok
            }
        }

        static M(){
            return class {
                m() {
                    new TestNonStatics().#prop // OK
                    new Inner().#foo; // OK
                }
            }
        }
    }
}

//// [privateNameWhenNotUseDefineForClassFieldsInEsNext.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TestWithStatics_prop, _Inner_foo, _a, _TestNonStatics_prop;
class TestWithStatics {
    constructor() {
        _TestWithStatics_prop.set(this, 0);
    }
}
_TestWithStatics_prop = new WeakMap();
TestWithStatics.dd = __classPrivateFieldGet(new TestWithStatics(), _TestWithStatics_prop, "f"); // OK
TestWithStatics["X_ z_ zz"] = (_a = class Inner {
        constructor() {
            _Inner_foo.set(this, 10);
        }
        m() {
            __classPrivateFieldGet(new TestWithStatics(), _TestWithStatics_prop, "f"); // OK
        }
        static M() {
            return class {
                m() {
                    __classPrivateFieldGet(new TestWithStatics(), _TestWithStatics_prop, "f"); // OK
                    __classPrivateFieldGet(new _a(), _Inner_foo, "f"); // OK
                }
            };
        }
    },
    _Inner_foo = new WeakMap(),
    _a.C = class InnerInner {
        m() {
            __classPrivateFieldGet(new TestWithStatics(), _TestWithStatics_prop, "f"); // OK
            __classPrivateFieldGet(new _a(), _Inner_foo, "f"); // OK
        }
    },
    _a);
class TestNonStatics {
    constructor() {
        var _Inner_foo_1, _b;
        _TestNonStatics_prop.set(this, 0);
        this.dd = __classPrivateFieldGet(new TestNonStatics(), _TestNonStatics_prop, "f"); // OK
        this["X_ z_ zz"] = (_b = class Inner {
                constructor() {
                    _Inner_foo_1.set(this, 10);
                    this.C = class InnerInner {
                        m() {
                            __classPrivateFieldGet(new TestNonStatics(), _TestNonStatics_prop, "f"); // Ok
                            __classPrivateFieldGet(new _b(), _Inner_foo_1, "f"); // Ok
                        }
                    };
                }
                m() {
                    __classPrivateFieldGet(new TestNonStatics(), _TestNonStatics_prop, "f"); // Ok
                }
                static M() {
                    return class {
                        m() {
                            __classPrivateFieldGet(new TestNonStatics(), _TestNonStatics_prop, "f"); // OK
                            __classPrivateFieldGet(new _b(), _Inner_foo_1, "f"); // OK
                        }
                    };
                }
            },
            _Inner_foo_1 = new WeakMap(),
            _b);
    }
}
_TestNonStatics_prop = new WeakMap();

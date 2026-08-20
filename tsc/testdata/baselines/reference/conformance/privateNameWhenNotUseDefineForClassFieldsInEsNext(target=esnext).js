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
class TestWithStatics {
    #prop = 0;
    static { this.dd = new TestWithStatics().#prop; } // OK
    static { this["X_ z_ zz"] = class Inner {
        #foo = 10;
        m() {
            new TestWithStatics().#prop; // OK
        }
        static { this.C = class InnerInner {
            m() {
                new TestWithStatics().#prop; // OK
                new Inner().#foo; // OK
            }
        }; }
        static M() {
            return class {
                m() {
                    new TestWithStatics().#prop; // OK
                    new Inner().#foo; // OK
                }
            };
        }
    }; }
}
class TestNonStatics {
    constructor() {
        this.#prop = 0;
        this.dd = new TestNonStatics().#prop; // OK
        this["X_ z_ zz"] = class Inner {
            constructor() {
                this.#foo = 10;
                this.C = class InnerInner {
                    m() {
                        new TestNonStatics().#prop; // Ok
                        new Inner().#foo; // Ok
                    }
                };
            }
            #foo;
            m() {
                new TestNonStatics().#prop; // Ok
            }
            static M() {
                return class {
                    m() {
                        new TestNonStatics().#prop; // OK
                        new Inner().#foo; // OK
                    }
                };
            }
        };
    }
    #prop;
}

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
class TestWithStatics {
    #prop = 0;
    static dd = new TestWithStatics().#prop; // OK
    static ["X_ z_ zz"] = class Inner {
        #foo = 10;
        m() {
            new TestWithStatics().#prop; // OK
        }
        static C = class InnerInner {
            m() {
                new TestWithStatics().#prop; // OK
                new Inner().#foo; // OK
            }
        };
        static M() {
            return class {
                m() {
                    new TestWithStatics().#prop; // OK
                    new Inner().#foo; // OK
                }
            };
        }
    };
}
class TestNonStatics {
    #prop = 0;
    dd = new TestNonStatics().#prop; // OK
    ["X_ z_ zz"] = class Inner {
        #foo = 10;
        m() {
            new TestNonStatics().#prop; // Ok
        }
        C = class InnerInner {
            m() {
                new TestNonStatics().#prop; // Ok
                new Inner().#foo; // Ok
            }
        };
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

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
var _a;
class TestWithErrors {
    constructor() {
        this.#prop = 0;
    }
    #prop;
}
TestWithErrors.dd = new TestWithErrors().#prop; // Err
TestWithErrors["X_ z_ zz"] = (_a = class Inner {
        constructor() {
            this.#foo = 10;
        }
        #foo;
        m() {
            new TestWithErrors().#prop; // Err
        }
        static M() {
            return class {
                m() {
                    new TestWithErrors().#prop; // Err
                    new Inner().#foo; // OK
                }
            };
        }
    },
    _a.C = class InnerInner {
        m() {
            new TestWithErrors().#prop; // Err
            new _a().#foo; // Err
        }
    },
    _a);
class TestNoErrors {
    constructor() {
        this.#prop = 0;
        this.dd = new TestNoErrors().#prop; // OK
        this["X_ z_ zz"] = class Inner {
            constructor() {
                this.#foo = 10;
                this.C = class InnerInner {
                    m() {
                        new TestNoErrors().#prop; // Ok
                        new Inner().#foo; // Ok
                    }
                };
            }
            #foo;
            m() {
                new TestNoErrors().#prop; // Ok
            }
            static M() {
                return class {
                    m() {
                        new TestNoErrors().#prop; // OK
                        new Inner().#foo; // OK
                    }
                };
            }
        };
    }
    #prop;
}

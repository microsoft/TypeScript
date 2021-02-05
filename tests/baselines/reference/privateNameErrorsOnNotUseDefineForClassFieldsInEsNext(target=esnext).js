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
var _a;
class Test {
    constructor() {
        this.#prop = 0;
    }
    #prop;
}
Test.dd = new Test().#prop; // Err
Test["X_ z_ zz"] = (_a = class Inner {
        constructor() {
            this.#foo = 10;
        }
        #foo;
        m() {
            new Test().#prop; // Err
        }
        static M() {
            return class {
                m() {
                    new Test().#prop; // Err
                    new Inner().#foo; // OK
                }
            };
        }
    },
    _a.C = class InnerInner {
        m() {
            new Test().#prop; // Err
            new _a().#foo; // Err
        }
    },
    _a);

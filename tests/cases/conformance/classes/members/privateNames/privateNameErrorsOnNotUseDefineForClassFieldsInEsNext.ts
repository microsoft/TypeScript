// @strict: true
// @target: esNext,es2020
// @useDefineForClassFields: false

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
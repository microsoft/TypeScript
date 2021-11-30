// @target: esnext, es6, es5
// @useDefineForClassFields: false

class C {
    static readonly c: "foo" = "foo"
    static bar =  class Inner {
        static [this.c] = 123;
        [this.c] = 123;
    }
}

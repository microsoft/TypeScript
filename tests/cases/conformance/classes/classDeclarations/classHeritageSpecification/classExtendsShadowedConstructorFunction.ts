class C { foo: string; }

namespace M {
    var C = 1;
    class D extends C { // error, C must evaluate to constructor function
        bar: string;
    }
}
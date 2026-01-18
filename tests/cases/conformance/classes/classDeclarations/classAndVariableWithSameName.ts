class C { foo: string; } // error
var C = ''; // error

namespace M {
    class D { // error
        bar: string;
    }

    var D = 1; // error
}
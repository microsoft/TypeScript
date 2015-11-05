struct C { foo: string; } // error
var C = ''; // error

module M {
    struct D { // error
        bar: string;
    }

    var D = 1; // error
}
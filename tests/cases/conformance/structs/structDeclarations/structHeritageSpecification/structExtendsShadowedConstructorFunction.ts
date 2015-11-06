struct C { foo: string; }

module M {
    var C = 1;
    struct D extends C { // error, C must evaluate to constructor function
        bar: string;
    }
}
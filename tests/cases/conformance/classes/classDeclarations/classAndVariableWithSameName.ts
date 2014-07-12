class C { foo: string; }
var C = ''; // error

module M {
    class D {
        bar: string;
    }

    var D = 1; // error
}
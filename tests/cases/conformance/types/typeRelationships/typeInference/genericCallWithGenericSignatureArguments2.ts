// When a function expression is inferentially typed (section 4.9.3) and a type assigned to a parameter in that expression references type parameters for which inferences are being made, 
// the corresponding inferred type arguments to become fixed and no further candidate inferences are made for them.

module onlyT {
    function foo<T>(a: (x: T) => T, b: (x: T) => T) {
        var r: (x: T) => T;
        return r;
    }

    var r1: (x: {}) => {} = foo((x: number) => 1, (x: string) => '');

    function other2<T extends Date>(x: T) {
        var r7 = foo((a: T) => a, (b: T) => b); // T => T
        // BUG 835518
        var r9 = r7(new Date()); // should be ok
        var r10 = r7(1); // error
    }

    function foo2<T extends Date>(a: (x: T) => T, b: (x: T) => T) {
        var r: (x: T) => T;
        return r;
    }

    function other3<T extends RegExp>(x: T) {
        var r7 = foo2((a: T) => a, (b: T) => b); // error
        var r7b = foo2((a) => a, (b) => b); // valid, T is inferred to be Date
    }

    enum E { A }
    enum F { A }

    function foo3<T>(x: T, a: (x: T) => T, b: (x: T) => T) {
        var r: (x: T) => T;
        return r;
    }

    var r7 = foo3(E.A, (x) => E.A, (x) => F.A); // error
}

module TU {
    function foo<T, U>(a: (x: T) => T, b: (x: U) => U) {
        var r: (x: T) => T;
        return r;
    }

    var r1: (x: {}) => {} = foo((x: number) => 1, (x: string) => '');

    function other2<T extends Date>(x: T) {
        var r7 = foo((a: T) => a, (b: T) => b); 
        var r9 = r7(new Date()); 
        var r10 = r7(1); 
    }

    function foo2<T extends Date, U extends Date>(a: (x: T) => T, b: (x: U) => U) {
        var r: (x: T) => T;
        return r;
    }

    function other3<T extends RegExp>(x: T) {
        var r7 = foo2((a: T) => a, (b: T) => b); 
        var r7b = foo2((a) => a, (b) => b); 
    }

    enum E { A }
    enum F { A }

    function foo3<T>(x: T, a: (x: T) => T, b: (x: U) => U) {
        var r: (x: T) => T;
        return r;
    }

    var r7 = foo3(E.A, (x) => E.A, (x) => F.A);
}
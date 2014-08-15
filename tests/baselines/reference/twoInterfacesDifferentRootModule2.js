//// [twoInterfacesDifferentRootModule2.ts]
// two interfaces with different root modules should not merge

module M {
    export interface A {
        foo: string;
    }

    export interface B<T> {
        foo: T;
    }

    module M2 {
        export interface A {
            bar: number;
        }

        var a: A;
        var r1 = a.foo; // error
        var r2 = a.bar;

        export interface B<T> {
            bar: T;
        }

        var b: B<string>;
        var r3 = b.foo; // error
        var r4 = b.bar;
    }

    var a: A;
    var r1 = a.foo; 
    var r2 = a.bar; // error

    var b: B<string>;
    var r3 = b.foo; 
    var r4 = b.bar; // error
}

//// [twoInterfacesDifferentRootModule2.js]
// two interfaces with different root modules should not merge
var M;
(function (M) {
    var M2;
    (function (M2) {
        var a;
        var r1 = a.foo; // error
        var r2 = a.bar;
        var b;
        var r3 = b.foo; // error
        var r4 = b.bar;
    })(M2 || (M2 = {}));
    var a;
    var r1 = a.foo;
    var r2 = a.bar; // error
    var b;
    var r3 = b.foo;
    var r4 = b.bar; // error
})(M || (M = {}));

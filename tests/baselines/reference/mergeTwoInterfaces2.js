//// [mergeTwoInterfaces2.ts]
// two interfaces with the same root module should merge

// root module now multiple module declarations
module M2 {
    export interface A {
        foo: string;
    }

    var a: A;
    var r1 = a.foo
    var r2 = a.bar;
}

module M2 {
    export interface A {
        bar: number;
    }

    var a: A;
    var r1 = a.foo
    var r2 = a.bar;
}

// same as above but with an additional level of nesting
module M2 {
    export module M3 {
        export interface A {
            foo: string;
        }

        var a: A;
        var r1 = a.foo
        var r2 = a.bar;
    }
}

module M2 {
    export module M3 {
        export interface A {
            bar: number;
        }

        var a: A;
        var r1 = a.foo
        var r2 = a.bar;
    }
}

//// [mergeTwoInterfaces2.js]
// two interfaces with the same root module should merge
// root module now multiple module declarations
var M2;
(function (M2) {
    var a;
    var r1 = a.foo;
    var r2 = a.bar;
})(M2 || (M2 = {}));
(function (M2) {
    var a;
    var r1 = a.foo;
    var r2 = a.bar;
})(M2 || (M2 = {}));
// same as above but with an additional level of nesting
(function (M2) {
    var M3;
    (function (M3) {
        var a;
        var r1 = a.foo;
        var r2 = a.bar;
    })(M3 = M2.M3 || (M2.M3 = {}));
})(M2 || (M2 = {}));
(function (M2) {
    var M3;
    (function (M3) {
        var a;
        var r1 = a.foo;
        var r2 = a.bar;
    })(M3 = M2.M3 || (M2.M3 = {}));
})(M2 || (M2 = {}));

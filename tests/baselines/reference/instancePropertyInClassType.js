//// [tests/cases/conformance/classes/members/classTypes/instancePropertyInClassType.ts] ////

//// [instancePropertyInClassType.ts]
module NonGeneric {
    class C {
        x: string;
        get y() {
            return 1;
        }
        set y(v) { }
        fn() { return this; }
        constructor(public a: number, private b: number) { }
    }

    var c = new C(1, 2);
    var r = c.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = 4;
    var r6 = c.y(); // error

}

module Generic {
    class C<T,U> {
        x: T;
        get y() {
            return null;
        }
        set y(v: U) { }
        fn() { return this; }
        constructor(public a: T, private b: U) { }
    }

    var c = new C(1, '');
    var r = c.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = '';
    var r6 = c.y(); // error
}

//// [instancePropertyInClassType.js]
var NonGeneric;
(function (NonGeneric) {
    class C {
        a;
        b;
        x;
        get y() {
            return 1;
        }
        set y(v) { }
        fn() { return this; }
        constructor(a, b) {
            this.a = a;
            this.b = b;
        }
    }
    var c = new C(1, 2);
    var r = c.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = 4;
    var r6 = c.y(); // error
})(NonGeneric || (NonGeneric = {}));
var Generic;
(function (Generic) {
    class C {
        a;
        b;
        x;
        get y() {
            return null;
        }
        set y(v) { }
        fn() { return this; }
        constructor(a, b) {
            this.a = a;
            this.b = b;
        }
    }
    var c = new C(1, '');
    var r = c.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = '';
    var r6 = c.y(); // error
})(Generic || (Generic = {}));

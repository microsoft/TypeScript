//// [tests/cases/conformance/classes/members/classTypes/instancePropertiesInheritedIntoClassType.ts] ////

//// [instancePropertiesInheritedIntoClassType.ts]
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

    class D extends C { e: string; }

    var d = new D(1, 2);
    var r = d.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = 4;
    var r6 = d.y(); // error

}

module Generic {
    class C<T, U> {
        x: T;
        get y() {
            return null;
        }
        set y(v: U) { }
        fn() { return this; }
        constructor(public a: T, private b: U) { }
    }

    class D<T, U> extends C<T, U> { e: T; }

    var d = new D(1, '');
    var r = d.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = '';
    var r6 = d.y(); // error
}

//// [instancePropertiesInheritedIntoClassType.js]
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
    class D extends C {
        e;
    }
    var d = new D(1, 2);
    var r = d.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = 4;
    var r6 = d.y();
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
    class D extends C {
        e;
    }
    var d = new D(1, '');
    var r = d.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = '';
    var r6 = d.y();
})(Generic || (Generic = {}));

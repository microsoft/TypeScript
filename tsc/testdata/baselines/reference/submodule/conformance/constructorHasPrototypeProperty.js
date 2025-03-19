//// [tests/cases/conformance/classes/members/constructorFunctionTypes/constructorHasPrototypeProperty.ts] ////

//// [constructorHasPrototypeProperty.ts]
module NonGeneric {
    class C {
        foo: string;
    }

    class D extends C {
        bar: string;
    }

    var r = C.prototype;
    r.foo;
    var r2 = D.prototype;
    r2.bar;
}

module Generic {
    class C<T,U> {
        foo: T;
        bar: U;
    }

    class D<T,U> extends C<T,U> {
        baz: T;
        bing: U;
    }

    var r = C.prototype; // C<any, any>
    var ra = r.foo; // any
    var r2 = D.prototype; // D<any, any>
    var rb = r2.baz; // any
}

//// [constructorHasPrototypeProperty.js]
var NonGeneric;
(function (NonGeneric) {
    class C {
        foo;
    }
    class D extends C {
        bar;
    }
    var r = C.prototype;
    r.foo;
    var r2 = D.prototype;
    r2.bar;
})(NonGeneric || (NonGeneric = {}));
var Generic;
(function (Generic) {
    class C {
        foo;
        bar;
    }
    class D extends C {
        baz;
        bing;
    }
    var r = C.prototype; // C<any, any>
    var ra = r.foo; // any
    var r2 = D.prototype; // D<any, any>
    var rb = r2.baz; // any
})(Generic || (Generic = {}));

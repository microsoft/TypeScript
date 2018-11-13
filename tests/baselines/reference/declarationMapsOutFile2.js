//// [tests/cases/compiler/declarationMapsOutFile2.ts] ////

//// [a.ts]
class Foo {
    doThing(x: {a: number}) {
        return {b: x.a};
    }
    static make() {
        return new Foo();
    }
}
//// [index.ts]
const c = new Foo();
c.doThing({a: 42});

let x = c.doThing({a: 12});


//// [bundle.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.doThing = function (x) {
        return { b: x.a };
    };
    Foo.make = function () {
        return new Foo();
    };
    return Foo;
}());
var c = new Foo();
c.doThing({ a: 42 });
var x = c.doThing({ a: 12 });


//// [bundle.d.ts]
declare class Foo {
    doThing(x: {
        a: number;
    }): {
        b: number;
    };
    static make(): Foo;
}
declare const c: Foo;
declare let x: {
    b: number;
};
//# sourceMappingURL=bundle.d.ts.map
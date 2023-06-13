//// [tests/cases/compiler/gettersAndSettersErrors.ts] ////

//// [gettersAndSettersErrors.ts]
class C {
    public get Foo() { return "foo";} // ok
    public set Foo(foo:string) {} // ok

    public Foo = 0; // error - duplicate identifier Foo - confirmed
    public get Goo(v:string):string {return null;} // error - getters must not have a parameter
    public set Goo(v:string):string {} // error - setters must not specify a return type
}

class E {
    private get Baz():number { return 0; }
    public set Baz(n:number) {} // error - accessors do not agree in visibility
}




//// [gettersAndSettersErrors.js]
var C = /** @class */ (function () {
    function C() {
        this.Foo = 0; // error - duplicate identifier Foo - confirmed
    }
    Object.defineProperty(C.prototype, "Foo", {
        get: function () { return "foo"; } // ok
        ,
        set: function (foo) { } // ok
        ,
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "Goo", {
        get: function (v) { return null; } // error - getters must not have a parameter
        ,
        set: function (v) { } // error - setters must not specify a return type
        ,
        enumerable: false,
        configurable: true
    });
    return C;
}());
var E = /** @class */ (function () {
    function E() {
    }
    Object.defineProperty(E.prototype, "Baz", {
        get: function () { return 0; },
        set: function (n) { } // error - accessors do not agree in visibility
        ,
        enumerable: false,
        configurable: true
    });
    return E;
}());

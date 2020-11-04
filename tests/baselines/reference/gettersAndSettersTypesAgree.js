//// [gettersAndSettersTypesAgree.ts]
class C {
    public get Foo() { return "foo";} // ok
    public set Foo(foo) {} // ok - type inferred from getter return statement

    public get Bar() { return "foo";} // ok
    public set Bar(bar:string) {} // ok - type must be declared
}

var o1 = {get Foo(){return 0;}, set Foo(val){}}; // ok - types agree (inference)
var o2 = {get Foo(){return 0;}, set Foo(val:number){}}; // ok - types agree

//// [gettersAndSettersTypesAgree.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        get: function () { return "foo"; } // ok
        ,
        set: function (foo) { } // ok - type inferred from getter return statement
        ,
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "Bar", {
        get: function () { return "foo"; } // ok
        ,
        set: function (bar) { } // ok - type must be declared
        ,
        enumerable: false,
        configurable: true
    });
    return C;
}());
var o1 = { get Foo() { return 0; }, set Foo(val) { } }; // ok - types agree (inference)
var o2 = { get Foo() { return 0; }, set Foo(val) { } }; // ok - types agree

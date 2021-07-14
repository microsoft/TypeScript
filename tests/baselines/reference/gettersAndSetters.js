//// [gettersAndSetters.ts]
// classes
class C {
    public fooBack = "";
    static barBack:string = "";
    public bazBack = "";
    
    public get Foo() { return this.fooBack;} // ok
    public set Foo(foo:string) {this.fooBack = foo;} // ok

    static get Bar() {return C.barBack;} // ok
    static set Bar(bar:string) {C.barBack = bar;} // ok

    public get = function() {} // ok
    public set = function() {} // ok
}

var c = new C();

var foo = c.Foo;
c.Foo = "foov";

var bar = C.Bar;
C.Bar = "barv";

var baz = c.Baz;
c.Baz = "bazv";

// The Foo accessors' return and param types should be contextually typed to the Foo field
var o : {Foo:number;} = {get Foo() {return 0;}, set Foo(val:number){val}}; // o

var ofg = o.Foo;
o.Foo = 0;


interface I1 {
    (n:number):number;
}

var i:I1 = function (n) {return n;}

// Repro from #45006
const x: string | number = Math.random() < 0.5 ? "str" : 123;
if (typeof x === "string") {
  let obj = {
    set prop(_: any) { x.toUpperCase(); },
    get prop() { return x.toUpperCase() },
    method() { return x.toUpperCase() }
  }
}

//// [gettersAndSetters.js]
// classes
var C = /** @class */ (function () {
    function C() {
        this.fooBack = "";
        this.bazBack = "";
        this.get = function () { }; // ok
        this.set = function () { }; // ok
    }
    Object.defineProperty(C.prototype, "Foo", {
        get: function () { return this.fooBack; } // ok
        ,
        set: function (foo) { this.fooBack = foo; } // ok
        ,
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "Bar", {
        get: function () { return C.barBack; } // ok
        ,
        set: function (bar) { C.barBack = bar; } // ok
        ,
        enumerable: false,
        configurable: true
    });
    C.barBack = "";
    return C;
}());
var c = new C();
var foo = c.Foo;
c.Foo = "foov";
var bar = C.Bar;
C.Bar = "barv";
var baz = c.Baz;
c.Baz = "bazv";
// The Foo accessors' return and param types should be contextually typed to the Foo field
var o = { get Foo() { return 0; }, set Foo(val) { val; } }; // o
var ofg = o.Foo;
o.Foo = 0;
var i = function (n) { return n; };
// Repro from #45006
var x = Math.random() < 0.5 ? "str" : 123;
if (typeof x === "string") {
    var obj = {
        set prop(_) { x.toUpperCase(); },
        get prop() { return x.toUpperCase(); },
        method: function () { return x.toUpperCase(); }
    };
}

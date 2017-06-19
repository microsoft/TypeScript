//// [classConstructorAccessibility3.ts]
class Foo {
     constructor(public x: number) { }
}

class Bar {
    public constructor(public x: number) { }
}

class Baz {
    protected constructor(public x: number) { }
}

class Qux {
     private constructor(public x: number) { }
}

// b is public
let a = Foo;
a = Bar;
a = Baz; // error Baz is protected
a = Qux; // error Qux is private

// b is protected
let b = Baz;
b = Foo;
b = Bar;
b = Qux; // error Qux is private

// c is private
let c = Qux;
c = Foo;
c = Bar;
c = Baz;

//// [classConstructorAccessibility3.js]
var Foo = /** @class */ (function () {
    function Foo(x) {
        this.x = x;
    }
    return Foo;
}());
var Bar = /** @class */ (function () {
    function Bar(x) {
        this.x = x;
    }
    return Bar;
}());
var Baz = /** @class */ (function () {
    function Baz(x) {
        this.x = x;
    }
    return Baz;
}());
var Qux = /** @class */ (function () {
    function Qux(x) {
        this.x = x;
    }
    return Qux;
}());
// b is public
var a = Foo;
a = Bar;
a = Baz; // error Baz is protected
a = Qux; // error Qux is private
// b is protected
var b = Baz;
b = Foo;
b = Bar;
b = Qux; // error Qux is private
// c is private
var c = Qux;
c = Foo;
c = Bar;
c = Baz;


//// [classConstructorAccessibility3.d.ts]
declare class Foo {
    x: number;
    constructor(x: number);
}
declare class Bar {
    x: number;
    constructor(x: number);
}
declare class Baz {
    x: number;
    protected constructor(x: number);
}
declare class Qux {
    x: number;
    private constructor();
}
declare let a: typeof Foo;
declare let b: typeof Baz;
declare let c: typeof Qux;

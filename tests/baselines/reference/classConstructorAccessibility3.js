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
b = Foo; // error Foo is public
b = Bar; // error Baz is public
b = Qux; // error Qux is private

// c is private
let c = Qux;
c = Foo; // error Foo is public
c = Bar; // error Bar is public
c = Baz; // error Baz is protected

//// [classConstructorAccessibility3.js]
var Foo = (function () {
    function Foo(x) {
        this.x = x;
    }
    return Foo;
}());
var Bar = (function () {
    function Bar(x) {
        this.x = x;
    }
    return Bar;
}());
var Baz = (function () {
    function Baz(x) {
        this.x = x;
    }
    return Baz;
}());
var Qux = (function () {
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
b = Foo; // error Foo is public
b = Bar; // error Baz is public
b = Qux; // error Qux is private
// c is private
var c = Qux;
c = Foo; // error Foo is public
c = Bar; // error Bar is public
c = Baz; // error Baz is protected


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
    private constructor(x);
}
declare let a: typeof Foo;
declare let b: typeof Baz;
declare let c: typeof Qux;

//// [tests/cases/compiler/varAsID.ts] ////

//// [varAsID.ts]
class Foo {
    var; // ok
    x=1;
}

var f = new Foo();


class Foo2 {
    var // not an error, because of ASI.
    x=1;
}

var f2 = new Foo2();





//// [varAsID.js]
class Foo {
    var; // ok
    x = 1;
}
var f = new Foo();
class Foo2 {
    var; // not an error, because of ASI.
    x = 1;
}
var f2 = new Foo2();

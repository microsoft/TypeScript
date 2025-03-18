//// [tests/cases/compiler/callOverloads4.ts] ////

//// [callOverloads4.ts]
function Foo():Foo; // error
function Foo(s:string):Foo; // error
class Foo { // error
    bar1() { /*WScript.Echo("bar1");*/ }
    constructor(s: string);
    constructor(x: any) {
        // WScript.Echo("Constructor function has executed");
    }
}

var f1 = new Foo("hey");


f1.bar1();
Foo();
Foo("s");


//// [callOverloads4.js]
class Foo {
    bar1() { }
    constructor(x) {
    }
}
var f1 = new Foo("hey");
f1.bar1();
Foo();
Foo("s");

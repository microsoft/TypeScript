//// [tests/cases/compiler/callOverloads1.ts] ////

//// [callOverloads1.ts]
class Foo { // error
    bar1() { /*WScript.Echo("bar1");*/ }

    constructor(x: any) {
        // WScript.Echo("Constructor function has executed");
    }
}

function Foo(); // error
function F1(s:string);
function F1(a:any) { return a;}

var f1 = new Foo("hey");


f1.bar1();
Foo();

//// [callOverloads1.js]
class Foo {
    bar1() { }
    constructor(x) {
        // WScript.Echo("Constructor function has executed");
    }
}
function F1(a) { return a; }
var f1 = new Foo("hey");
f1.bar1();
Foo();

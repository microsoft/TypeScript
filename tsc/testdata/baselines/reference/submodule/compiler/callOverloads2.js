//// [tests/cases/compiler/callOverloads2.ts] ////

//// [callOverloads2.ts]
class Foo { // error
    bar1() { /*WScript.Echo("bar1");*/ }

    constructor(x: any) {
        // WScript.Echo("Constructor function has executed");
    }
}

function Foo(); // error

function F1(s:string) {return s;} // error
function F1(a:any) { return a;} // error

function Goo(s:string); // error - no implementation

declare function Gar(s:String); // expect no error

var f1 = new Foo("hey");


f1.bar1();
Foo();


//// [callOverloads2.js]
class Foo {
    bar1() { }
    constructor(x) {
    }
}
function F1(s) { return s; }
function F1(a) { return a; }
var f1 = new Foo("hey");
f1.bar1();
Foo();

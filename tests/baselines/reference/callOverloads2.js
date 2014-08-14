//// [callOverloads2.ts]


class Foo {    
    bar1() { /*WScript.Echo("bar1");*/ }

    constructor(x: any) {
        // WScript.Echo("Constructor function has executed");
    }
}

function Foo();

function F1(s:string) {return s;}
function F1(a:any) { return a;} // error -  duplicate identifier

function Goo(s:string); // error - no implementation

declare function Gar(s:String); // expect no error

var f1 = new Foo("hey");


f1.bar1();
Foo();


//// [callOverloads2.js]
var Foo = (function () {
    function Foo(x) {
    }
    Foo.prototype.bar1 = function () {
    };
    return Foo;
})();
function F1(s) {
    return s;
}
function F1(a) {
    return a;
} // error -  duplicate identifier 
var f1 = new Foo("hey");
f1.bar1();
Foo();

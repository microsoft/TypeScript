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
var Foo = /** @class */ (function () {
    function Foo(x) {
        // WScript.Echo("Constructor function has executed");
    }
    Foo.prototype.bar1 = function () { };
    return Foo;
}());
var f1 = new Foo("hey");
f1.bar1();
Foo();
Foo("s");

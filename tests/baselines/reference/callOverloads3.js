//// [callOverloads3.ts]

function Foo():Foo;
function Foo(s:string):Foo;
class Foo {    
    bar1() { /*WScript.Echo("bar1");*/ }
    constructor(x: any) {
        // WScript.Echo("Constructor function has executed");
    }
}
//class Foo(s: String);

var f1 = new Foo("hey");


f1.bar1();
Foo();
Foo("s");


//// [callOverloads3.js]
var Foo = (function () {
    function Foo(x) {
    }
    Foo.prototype.bar1 = function () {
    };
    return Foo;
})();
var f1 = new Foo("hey");
f1.bar1();
Foo();
Foo("s");

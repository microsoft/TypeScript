//// [callOverloads5.ts]
function Foo():Foo;
function Foo(s:string):Foo;
class Foo {
	bar1(s:string);
	bar1(n:number);
    bar1(a:any) { /*WScript.Echo(a);*/ }
    constructor(x: any) {
        // WScript.Echo("Constructor function has executed");
    }
}
//class Foo(s: String);

var f1 = new Foo("hey");


f1.bar1("a");
Foo();
Foo("s");


//// [callOverloads5.js]
var Foo = (function () {
    function Foo(x) {
    }
    Foo.prototype.bar1 = function (a) {
    };
    return Foo;
})();
var f1 = new Foo("hey");
f1.bar1("a");
Foo();
Foo("s");

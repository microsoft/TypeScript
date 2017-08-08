//// [callOverloads5.ts]
function Foo():Foo; // error
function Foo(s:string):Foo; // error
class Foo { // error
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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Foo = (function () {
    function Foo(x) {
        // WScript.Echo("Constructor function has executed");
    }
    Foo.prototype.bar1 = function (a) { };
    __names(Foo.prototype, ["bar1"]);
    return Foo;
}());
//class Foo(s: String);
var f1 = new Foo("hey");
f1.bar1("a");
Foo();
Foo("s");

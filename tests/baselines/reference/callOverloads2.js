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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
    Foo.prototype.bar1 = function () { };
    __names(Foo.prototype, ["bar1"]);
    return Foo;
}());
function F1(s) { return s; } // error
function F1(a) { return a; } // error
var f1 = new Foo("hey");
f1.bar1();
Foo();

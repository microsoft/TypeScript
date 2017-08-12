//// [constructorOverloads1.ts]
class Foo {
    constructor(s: string);
    constructor(n: number);
    constructor(x: any) {

    }
    constructor(x: any) {

    }
    bar1() {  /*WScript.Echo("bar1");*/ }
    bar2() {  /*WScript.Echo("bar1");*/ }
}

var f1 = new Foo("hey");
var f2 = new Foo(0);
var f3 = new Foo(f1);
var f4 = new Foo([f1,f2,f3]);

f1.bar1();
f1.bar2();


//// [constructorOverloads1.js]
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
    }
    Foo.prototype.bar1 = function () { };
    Foo.prototype.bar2 = function () { };
    __names(Foo.prototype, ["bar1", "bar2"]);
    return Foo;
}());
var f1 = new Foo("hey");
var f2 = new Foo(0);
var f3 = new Foo(f1);
var f4 = new Foo([f1, f2, f3]);
f1.bar1();
f1.bar2();

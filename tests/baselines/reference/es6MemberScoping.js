//// [es6MemberScoping.ts]
class Foo {
    constructor(store: string) { }

    public foo() {
        return this._store.length; 
    }
    public _store = store; // should be an error.
}

class Foo2 {
 
  static Foo2():number { return 0; } // should not be an error
 
}


//// [es6MemberScoping.js]
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
    function Foo(store) {
        this._store = store; // should be an error.
    }
    Foo.prototype.foo = function () {
        return this._store.length;
    };
    __names(Foo.prototype, ["foo"]);
    return Foo;
}());
var Foo2 = (function () {
    function Foo2() {
    }
    Foo2.Foo2 = function () { return 0; }; // should not be an error
    return Foo2;
}());

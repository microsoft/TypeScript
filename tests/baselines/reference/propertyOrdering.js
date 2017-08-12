//// [propertyOrdering.ts]
class Foo {
    constructor(store: string) { }
      public foo() {
            return this._store.length;   // shouldn't be an error
      }
      public _store = store; // no repro if this is first line in class body


      public bar() { return this.store; } // should be an error

}

class Bar {
      public foo() {

            return this._store.length;   // shouldn't be an error

      }
    constructor(store: string) {
        this._store = store;
    }
}


//// [propertyOrdering.js]
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
    function Foo(store) {
        this._store = store; // no repro if this is first line in class body
    }
    Foo.prototype.foo = function () {
        return this._store.length; // shouldn't be an error
    };
    Foo.prototype.bar = function () { return this.store; }; // should be an error
    __names(Foo.prototype, ["foo", "bar"]);
    return Foo;
}());
var Bar = (function () {
    function Bar(store) {
        this._store = store;
    }
    Bar.prototype.foo = function () {
        return this._store.length; // shouldn't be an error
    };
    __names(Bar.prototype, ["foo"]);
    return Bar;
}());

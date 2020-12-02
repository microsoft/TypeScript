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
var Foo = /** @class */ (function () {
    function Foo(store) {
        this._store = store; // no repro if this is first line in class body
    }
    var Foo_prototype = Foo.prototype;
    Foo_prototype.foo = function () {
        return this._store.length; // shouldn't be an error
    };
    Foo_prototype.bar = function () { return this.store; }; // should be an error
    return Foo;
}());
var Bar = /** @class */ (function () {
    function Bar(store) {
        this._store = store;
    }
    Bar.prototype.foo = function () {
        return this._store.length; // shouldn't be an error
    };
    return Bar;
}());

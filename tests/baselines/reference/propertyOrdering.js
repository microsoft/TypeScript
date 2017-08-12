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
var Foo = (function () {
    function Foo(store) {
        this._store = store; // no repro if this is first line in class body
    }
    var proto_1 = Foo.prototype;
    proto_1.foo = function () {
        return this._store.length; // shouldn't be an error
    };
    proto_1.bar = function () { return this.store; }; // should be an error
    return Foo;
}());
var Bar = (function () {
    function Bar(store) {
        this._store = store;
    }
    var proto_2 = Bar.prototype;
    proto_2.foo = function () {
        return this._store.length; // shouldn't be an error
    };
    return Bar;
}());

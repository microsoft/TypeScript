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
var Foo = /** @class */ (function () {
    function Foo(store) {
        this._store = store; // should be an error.
    }
    Foo.prototype.foo = function () {
        return this._store.length;
    };
    return Foo;
}());
var Foo2 = /** @class */ (function () {
    function Foo2() {
    }
    Foo2.Foo2 = function () { return 0; }; // should not be an error
    return Foo2;
}());

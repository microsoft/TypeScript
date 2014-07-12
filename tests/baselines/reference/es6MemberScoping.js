//// [es6MemberScoping.js]
var Foo = (function () {
    function Foo(store) {
        this._store = store;
    }
    Foo.prototype.foo = function () {
        return this._store.length;
    };
    return Foo;
})();

var Foo2 = (function () {
    function Foo2() {
    }
    Foo2.Foo2 = function () {
        return 0;
    };
    return Foo2;
})();

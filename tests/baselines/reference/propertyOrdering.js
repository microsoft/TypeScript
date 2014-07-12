//// [propertyOrdering.js]
var Foo = (function () {
    function Foo(store) {
        this._store = store;
    }
    Foo.prototype.foo = function () {
        return this._store.length;
    };

    Foo.prototype.bar = function () {
        return this.store;
    };
    return Foo;
})();

var Bar = (function () {
    function Bar(store) {
        this._store = store;
    }
    Bar.prototype.foo = function () {
        return this._store.length;
    };
    return Bar;
})();

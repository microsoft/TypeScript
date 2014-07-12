//// [es6DeclOrdering.js]
var Bar = (function () {
    function Bar(store) {
        this._store = store; // this is an error for some reason? Unresolved symbol store
    }
    //public bar() { }
    Bar.prototype.foo = function () {
        return this._store.length;
    };
    return Bar;
})();

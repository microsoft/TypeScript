//// [es6DeclOrdering.ts]
class Bar {

   //public bar() { }

   public foo() {
       return this._store.length;
 
   }

   constructor(store: string) {
       this._store = store; // this is an error for some reason? Unresolved symbol store
 
   } 
}



//// [es6DeclOrdering.js]
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
var Bar = (function () {
    function Bar(store) {
        this._store = store; // this is an error for some reason? Unresolved symbol store
    }
    //public bar() { }
    Bar.prototype.foo = function () {
        return this._store.length;
    };
    __names(Bar.prototype, ["foo"]);
    return Bar;
}());

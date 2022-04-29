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
var Bar = /** @class */ (function () {
    function Bar(store) {
        this._store = store; // this is an error for some reason? Unresolved symbol store
    }
    //public bar() { }
    Bar.prototype.foo = function () {
        return this._store.length;
    };
    return Bar;
}());

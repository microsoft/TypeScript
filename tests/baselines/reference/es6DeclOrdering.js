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
var Bar = (function () {
    function Bar(store) {
        this._store = store; // this is an error for some reason? Unresolved symbol store
    }
    var proto_1 = Bar.prototype;
    //public bar() { }
    proto_1.foo = function () {
        return this._store.length;
    };
    return Bar;
}());

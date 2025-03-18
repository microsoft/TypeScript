//// [tests/cases/compiler/es6DeclOrdering.ts] ////

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
class Bar {
    foo() {
        return this._store.length;
    }
    constructor(store) {
        this._store = store;
    }
}

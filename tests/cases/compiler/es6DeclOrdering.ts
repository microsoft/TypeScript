class Bar {

   //public bar() { }

   public foo() {
       return this._store.length;
 
   }

   constructor(store: string) {
       this._store = store; // this is an error for some reason? Unresolved symbol store
 
   } 
}


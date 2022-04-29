

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

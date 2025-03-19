//// [tests/cases/compiler/propertyOrdering.ts] ////

//// [propertyOrdering.ts]
class Foo {
    constructor(store: string) { }
      public foo() {
            return this._store.length;   // shouldn't be an error
      }
      public _store = store; // no repro if this is first line in class body


      public bar() { return this.store; } // should be an error

}

class Bar {
      public foo() {

            return this._store.length;   // shouldn't be an error

      }
    constructor(store: string) {
        this._store = store;
    }
}


//// [propertyOrdering.js]
class Foo {
    constructor(store) { }
    foo() {
        return this._store.length; // shouldn't be an error
    }
    _store = store; // no repro if this is first line in class body
    bar() { return this.store; } // should be an error
}
class Bar {
    foo() {
        return this._store.length; // shouldn't be an error
    }
    constructor(store) {
        this._store = store;
    }
}

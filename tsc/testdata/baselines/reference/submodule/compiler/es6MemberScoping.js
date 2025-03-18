//// [tests/cases/compiler/es6MemberScoping.ts] ////

//// [es6MemberScoping.ts]
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


//// [es6MemberScoping.js]
class Foo {
    constructor(store) { }
    foo() {
        return this._store.length;
    }
    _store = store;
}
class Foo2 {
    static Foo2() { return 0; }
}

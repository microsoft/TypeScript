//// [tests/cases/compiler/staticOffOfInstance2.ts] ////

//// [staticOffOfInstance2.ts]
class List<T> {
    public Blah() {
        this.Foo(); // no error
        List.Foo();
    }
    public static Foo() { }
}


//// [staticOffOfInstance2.js]
class List {
    Blah() {
        this.Foo(); // no error
        List.Foo();
    }
    static Foo() { }
}

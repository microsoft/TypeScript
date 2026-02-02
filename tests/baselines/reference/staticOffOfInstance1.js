//// [tests/cases/compiler/staticOffOfInstance1.ts] ////

//// [staticOffOfInstance1.ts]
class List {
  public Blah() {
    this.Foo();
  }
  public static Foo() {}
}

//// [staticOffOfInstance1.js]
class List {
    Blah() {
        this.Foo();
    }
    static Foo() { }
}

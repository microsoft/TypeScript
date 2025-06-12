//// [tests/cases/compiler/functionOverloads5.ts] ////

//// [functionOverloads5.ts]
class baz { 
  public foo();
  private foo(bar?:any){ }
}


//// [functionOverloads5.js]
class baz {
    foo(bar) { }
}

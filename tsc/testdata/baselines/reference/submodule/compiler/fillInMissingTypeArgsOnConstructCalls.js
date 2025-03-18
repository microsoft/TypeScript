//// [tests/cases/compiler/fillInMissingTypeArgsOnConstructCalls.ts] ////

//// [fillInMissingTypeArgsOnConstructCalls.ts]
class A<T extends Object>{
      list: T ;
}
var a = new A();


//// [fillInMissingTypeArgsOnConstructCalls.js]
class A {
    list;
}
var a = new A();

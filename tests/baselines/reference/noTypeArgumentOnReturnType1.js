//// [tests/cases/compiler/noTypeArgumentOnReturnType1.ts] ////

//// [noTypeArgumentOnReturnType1.ts]
class A<T>{
 
 foo(): A{
  return null;
 }
}

//// [noTypeArgumentOnReturnType1.js]
class A {
    foo() {
        return null;
    }
}

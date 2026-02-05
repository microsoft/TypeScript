//// [tests/cases/compiler/instantiatedBaseTypeConstraints.ts] ////

//// [instantiatedBaseTypeConstraints.ts]
interface Foo<T extends Foo<T, C>, C> {
  foo(bar: C): void;
}

class Bar implements Foo<Bar, string> {
  foo(bar: string): void {
  }
}

 


//// [instantiatedBaseTypeConstraints.js]
"use strict";
class Bar {
    foo(bar) {
    }
}

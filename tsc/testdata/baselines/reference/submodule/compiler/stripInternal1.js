//// [tests/cases/compiler/stripInternal1.ts] ////

//// [stripInternal1.ts]
class C {
  foo(): void { }
  // @internal
  bar(): void { }
}

//// [stripInternal1.js]
class C {
    foo() { }
    // @internal
    bar() { }
}

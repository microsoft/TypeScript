//// [tests/cases/compiler/thisTypeAsConstraint.ts] ////

//// [thisTypeAsConstraint.ts]
class C {
  public m<T extends this>() {
  }
}

//// [thisTypeAsConstraint.js]
class C {
    m() {
    }
}

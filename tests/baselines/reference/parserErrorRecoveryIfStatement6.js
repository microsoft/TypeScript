//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/IfStatements/parserErrorRecoveryIfStatement6.ts] ////

//// [parserErrorRecoveryIfStatement6.ts]
class Foo {
  f1() {
    if (a.b) {
  }
  public f2() {
  }
  f3() {
  }
}


//// [parserErrorRecoveryIfStatement6.js]
class Foo {
    f1() {
        if (a.b) {
        }
    }
    f2() {
    }
    f3() {
    }
}

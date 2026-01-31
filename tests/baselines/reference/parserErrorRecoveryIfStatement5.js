//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/IfStatements/parserErrorRecoveryIfStatement5.ts] ////

//// [parserErrorRecoveryIfStatement5.ts]
class Foo {
  f1() {
    if (a.b) {
  }
  f2() {
  }
  f3() {
  }
}

//// [parserErrorRecoveryIfStatement5.js]
class Foo {
    f1() {
        if (a.b) {
        }
        f2();
        {
        }
        f3();
        {
        }
    }
}

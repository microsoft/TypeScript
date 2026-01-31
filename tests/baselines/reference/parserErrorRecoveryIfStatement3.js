//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/IfStatements/parserErrorRecoveryIfStatement3.ts] ////

//// [parserErrorRecoveryIfStatement3.ts]
class Foo {
  f1() {
    if (a.b
  }
  f2() {
  }
  f3() {
  }
}

//// [parserErrorRecoveryIfStatement3.js]
class Foo {
    f1() {
        if (a.b)
            ;
    }
    f2() {
    }
    f3() {
    }
}

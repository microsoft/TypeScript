//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/IfStatements/parserErrorRecoveryIfStatement4.ts] ////

//// [parserErrorRecoveryIfStatement4.ts]
class Foo {
  f1() {
    if (a.b)
  }
  f2() {
  }
  f3() {
  }
}

//// [parserErrorRecoveryIfStatement4.js]
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

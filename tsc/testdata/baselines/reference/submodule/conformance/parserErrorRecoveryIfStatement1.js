//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/IfStatements/parserErrorRecoveryIfStatement1.ts] ////

//// [parserErrorRecoveryIfStatement1.ts]
class Foo {
  f1() {
    if (
  }
  f2() {
  }
  f3() {
  }
}

//// [parserErrorRecoveryIfStatement1.js]
class Foo {
    f1() {
        if ()
            ;
    }
    f2() {
    }
    f3() {
    }
}

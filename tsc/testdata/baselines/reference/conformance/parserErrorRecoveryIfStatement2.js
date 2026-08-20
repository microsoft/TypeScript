//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/IfStatements/parserErrorRecoveryIfStatement2.ts] ////

//// [parserErrorRecoveryIfStatement2.ts]
class Foo {
  f1() {
    if (a
  }
  f2() {
  }
  f3() {
  }
}

//// [parserErrorRecoveryIfStatement2.js]
"use strict";
class Foo {
    f1() {
        if (a)
            ;
    }
    f2() {
    }
    f3() {
    }
}

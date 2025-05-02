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
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.f1 = function () {
        if (a.b) {
        }
        f2();
        {
        }
        f3();
        {
        }
    };
    return Foo;
}());

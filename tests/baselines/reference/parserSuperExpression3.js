//// [tests/cases/conformance/parser/ecmascript5/SuperExpressions/parserSuperExpression3.ts] ////

//// [parserSuperExpression3.ts]
class C {
  M() {
    this.super<T>(0);
  }
}

//// [parserSuperExpression3.js]
class C {
    M() {
        this.super(0);
    }
}

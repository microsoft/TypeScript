//// [tests/cases/conformance/parser/ecmascript5/SuperExpressions/parserSuperExpression2.ts] ////

//// [parserSuperExpression2.ts]
class C {
  M() {
    super<T>(0);
  }
}

//// [parserSuperExpression2.js]
class C {
    M() {
        super(0);
    }
}

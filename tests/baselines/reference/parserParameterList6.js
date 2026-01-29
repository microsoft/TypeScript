//// [tests/cases/conformance/parser/ecmascript5/ParameterLists/parserParameterList6.ts] ////

//// [parserParameterList6.ts]
class C {
  constructor(C: (public A) => any) {
  }
}

//// [parserParameterList6.js]
class C {
    constructor(C) {
    }
}

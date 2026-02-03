//// [tests/cases/conformance/parser/ecmascript5/ParameterLists/parserParameterList3.ts] ////

//// [parserParameterList3.ts]
class C {
  F(A?, B) { }
}

//// [parserParameterList3.js]
class C {
    F(A, B) { }
}

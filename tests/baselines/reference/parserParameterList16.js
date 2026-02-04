//// [tests/cases/conformance/parser/ecmascript5/ParameterLists/parserParameterList16.ts] ////

//// [parserParameterList16.ts]
class C {
   foo(a = 4);
   foo(a, b) { }
}

//// [parserParameterList16.js]
class C {
    foo(a, b) { }
}

//// [tests/cases/conformance/parser/ecmascript5/ParameterLists/parserParameterList17.ts] ////

//// [parserParameterList17.ts]
class C {
   constructor(a = 4);
   constructor(a, b) { }
}

//// [parserParameterList17.js]
class C {
    constructor(a, b) { }
}

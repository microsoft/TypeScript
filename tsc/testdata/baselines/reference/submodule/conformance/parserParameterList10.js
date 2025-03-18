//// [tests/cases/conformance/parser/ecmascript5/ParameterLists/parserParameterList10.ts] ////

//// [parserParameterList10.ts]
class C {
   foo(...bar = 0) { }
}

//// [parserParameterList10.js]
class C {
    foo(...bar = 0) { }
}

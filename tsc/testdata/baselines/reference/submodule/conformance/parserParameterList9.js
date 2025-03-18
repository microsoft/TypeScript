//// [tests/cases/conformance/parser/ecmascript5/ParameterLists/parserParameterList9.ts] ////

//// [parserParameterList9.ts]
class C {
   foo(...bar?) { }
}

//// [parserParameterList9.js]
class C {
    foo(...bar) { }
}

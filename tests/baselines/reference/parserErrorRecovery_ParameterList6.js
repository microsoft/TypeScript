//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ParameterLists/parserErrorRecovery_ParameterList6.ts] ////

//// [parserErrorRecovery_ParameterList6.ts]
class Foo {
    public banana (x: break) { }
}

//// [parserErrorRecovery_ParameterList6.js]
class Foo {
    banana(x) { }
}

//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/VariableLists/parserInvalidIdentifiersInVariableStatements1.ts] ////

//// [parserInvalidIdentifiersInVariableStatements1.ts]
var export;
var foo;
var class;
var bar;


//// [parserInvalidIdentifiersInVariableStatements1.js]
var ;
var foo;
var ;
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    return default_1;
}());
;
var bar;

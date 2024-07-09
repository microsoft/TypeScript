//// [tests/cases/conformance/parser/ecmascript5/Statements/ContinueStatements/parser_continueLabel.ts] ////

//// [parser_continueLabel.ts]
label1: for(var i = 0; i < 1; i++) {
    continue label1;
}

//// [parser_continueLabel.js]
label1: for (var i = 0; i < 1; i++) {
    continue label1;
}

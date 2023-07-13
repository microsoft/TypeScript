//// [tests/cases/conformance/parser/ecmascript5/Statements/ContinueStatements/parser_continueNotInIterationStatement3.ts] ////

//// [parser_continueNotInIterationStatement3.ts]
switch (0) {
  default:
    continue;
}

//// [parser_continueNotInIterationStatement3.js]
switch (0) {
    default:
        continue;
}

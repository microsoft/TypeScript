//// [tests/cases/conformance/parser/ecmascript5/Statements/ContinueStatements/parser_continueInIterationStatement4.ts] ////

//// [parser_continueInIterationStatement4.ts]
for (var i in something) {
  continue;
}

//// [parser_continueInIterationStatement4.js]
for (var i in something) {
    continue;
}

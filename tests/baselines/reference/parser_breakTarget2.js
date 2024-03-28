//// [tests/cases/conformance/parser/ecmascript5/Statements/BreakStatements/parser_breakTarget2.ts] ////

//// [parser_breakTarget2.ts]
target:
while (true) {
  break target;
}

//// [parser_breakTarget2.js]
target: while (true) {
    break target;
}

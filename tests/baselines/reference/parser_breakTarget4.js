//// [tests/cases/conformance/parser/ecmascript5/Statements/BreakStatements/parser_breakTarget4.ts] ////

//// [parser_breakTarget4.ts]
target1:
target2:
while (true) {
  break target2;
}

//// [parser_breakTarget4.js]
target1: target2: while (true) {
    break target2;
}

//// [tests/cases/conformance/parser/ecmascript5/Statements/BreakStatements/parser_breakTarget3.ts] ////

//// [parser_breakTarget3.ts]
target1:
target2:
while (true) {
  break target1;
}

//// [parser_breakTarget3.js]
target1: target2: while (true) {
    break target1;
}

//// [tests/cases/conformance/parser/ecmascript5/Statements/ContinueStatements/parser_continueTarget4.ts] ////

//// [parser_continueTarget4.ts]
target1:
target2:
while (true) {
  continue target2;
}

//// [parser_continueTarget4.js]
target1: target2: while (true) {
    continue target2;
}

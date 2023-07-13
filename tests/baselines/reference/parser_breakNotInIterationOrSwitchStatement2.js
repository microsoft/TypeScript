//// [tests/cases/conformance/parser/ecmascript5/Statements/BreakStatements/parser_breakNotInIterationOrSwitchStatement2.ts] ////

//// [parser_breakNotInIterationOrSwitchStatement2.ts]
while (true) {
  function f() {
    break;
  }
}

//// [parser_breakNotInIterationOrSwitchStatement2.js]
while (true) {
    function f() {
        break;
    }
}

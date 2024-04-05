//// [tests/cases/conformance/parser/ecmascript5/Statements/ContinueStatements/parser_continueNotInIterationStatement2.ts] ////

//// [parser_continueNotInIterationStatement2.ts]
while (true) {
  function f() {
    continue;
  }
}

//// [parser_continueNotInIterationStatement2.js]
while (true) {
    function f() {
        continue;
    }
}

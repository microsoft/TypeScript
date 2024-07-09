//// [tests/cases/conformance/parser/ecmascript5/Statements/ContinueStatements/parser_continueInIterationStatement2.ts] ////

//// [parser_continueInIterationStatement2.ts]
do {
  continue;
}
while (true);

//// [parser_continueInIterationStatement2.js]
do {
    continue;
} while (true);

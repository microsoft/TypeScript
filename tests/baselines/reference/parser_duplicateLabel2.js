//// [tests/cases/conformance/parser/ecmascript5/Statements/LabeledStatements/parser_duplicateLabel2.ts] ////

//// [parser_duplicateLabel2.ts]
target:
while (true) {
  target:
  while (true) {
  }
}

//// [parser_duplicateLabel2.js]
target: while (true) {
    target: while (true) {
    }
}

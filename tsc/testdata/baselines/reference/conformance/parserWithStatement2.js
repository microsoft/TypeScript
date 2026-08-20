//// [tests/cases/conformance/parser/ecmascript5/Statements/parserWithStatement2.ts] ////

//// [parserWithStatement2.ts]
with (1)
  return;

//// [parserWithStatement2.js]
"use strict";
with (1)
    return;

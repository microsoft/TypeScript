//// [tests/cases/compiler/continueInIterationStatement4.ts] ////

//// [continueInIterationStatement4.ts]
for (var i in something) {
  continue;
}

//// [continueInIterationStatement4.js]
"use strict";
for (var i in something) {
    continue;
}

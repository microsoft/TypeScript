//// [tests/cases/compiler/continueInIterationStatement2.ts] ////

//// [continueInIterationStatement2.ts]
do {
  continue;
}
while (true);

//// [continueInIterationStatement2.js]
"use strict";
do {
    continue;
} while (true);

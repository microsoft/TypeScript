//// [tests/cases/compiler/continueTarget6.ts] ////

//// [continueTarget6.ts]
while (true) {
  continue target;
}

//// [continueTarget6.js]
"use strict";
while (true) {
    continue target;
}

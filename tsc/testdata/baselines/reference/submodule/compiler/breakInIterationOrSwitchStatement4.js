//// [tests/cases/compiler/breakInIterationOrSwitchStatement4.ts] ////

//// [breakInIterationOrSwitchStatement4.ts]
for (var i in something) {
  break;
}

//// [breakInIterationOrSwitchStatement4.js]
"use strict";
for (var i in something) {
    break;
}

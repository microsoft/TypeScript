//// [tests/cases/compiler/breakNotInIterationOrSwitchStatement2.ts] ////

//// [breakNotInIterationOrSwitchStatement2.ts]
while (true) {
  function f() {
    break;
  }
}

//// [breakNotInIterationOrSwitchStatement2.js]
"use strict";
while (true) {
    function f() {
        break;
    }
}

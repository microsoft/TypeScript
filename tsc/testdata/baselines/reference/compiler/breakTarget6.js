//// [tests/cases/compiler/breakTarget6.ts] ////

//// [breakTarget6.ts]
while (true) {
  break target;
}

//// [breakTarget6.js]
"use strict";
while (true) {
    break target;
}

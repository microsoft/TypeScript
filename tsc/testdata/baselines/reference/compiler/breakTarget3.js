//// [tests/cases/compiler/breakTarget3.ts] ////

//// [breakTarget3.ts]
target1:
target2:
while (true) {
  break target1;
}

//// [breakTarget3.js]
"use strict";
target1: target2: while (true) {
    break target1;
}

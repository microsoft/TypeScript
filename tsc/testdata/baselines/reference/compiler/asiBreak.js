//// [tests/cases/compiler/asiBreak.ts] ////

//// [asiBreak.ts]
while (true) break

//// [asiBreak.js]
"use strict";
while (true)
    break;

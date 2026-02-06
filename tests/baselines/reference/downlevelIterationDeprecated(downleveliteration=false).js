//// [tests/cases/compiler/downlevelIterationDeprecated.ts] ////

//// [downlevelIterationDeprecated.ts]
declare const log: (s: string) => void;

declare const arr: string[];

for (const a of arr) {
    log(a);
}

//// [downlevelIterationDeprecated.js]
"use strict";
for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
    var a = arr_1[_i];
    log(a);
}

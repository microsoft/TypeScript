//// [tests/cases/compiler/regexpGlobalConstructorMatchIteration.ts] ////

//// [regexpGlobalConstructorMatchIteration.ts]
declare const pattern: string;
declare function consume(value: string): void;
const matches = "".match(new RegExp(pattern, "g"));
if (matches) {
    for (const match of matches) {
        consume(match);
    }
}


//// [regexpGlobalConstructorMatchIteration.js]
"use strict";
const matches = "".match(new RegExp(pattern, "g"));
if (matches) {
    for (const match of matches) {
        consume(match);
    }
}

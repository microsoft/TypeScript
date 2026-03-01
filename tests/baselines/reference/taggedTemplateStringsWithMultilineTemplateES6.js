//// [tests/cases/compiler/taggedTemplateStringsWithMultilineTemplateES6.ts] ////

//// [taggedTemplateStringsWithMultilineTemplateES6.ts]
function f(...args: any[]): void {
}

f `
\

`;

//// [taggedTemplateStringsWithMultilineTemplateES6.js]
"use strict";
function f(...args) {
}
f `
\

`;

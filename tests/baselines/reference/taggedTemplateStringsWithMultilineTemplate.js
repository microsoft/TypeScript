//// [tests/cases/compiler/taggedTemplateStringsWithMultilineTemplate.ts] ////

//// [taggedTemplateStringsWithMultilineTemplate.ts]
function f(...args: any[]): void {
}

f `
\

`;

//// [taggedTemplateStringsWithMultilineTemplate.js]
"use strict";
function f(...args) {
}
f `
\

`;

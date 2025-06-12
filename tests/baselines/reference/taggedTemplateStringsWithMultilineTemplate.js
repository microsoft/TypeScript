//// [tests/cases/compiler/taggedTemplateStringsWithMultilineTemplate.ts] ////

//// [taggedTemplateStringsWithMultilineTemplate.ts]
function f(...args: any[]): void {
}

f `
\

`;

//// [taggedTemplateStringsWithMultilineTemplate.js]
function f(...args) {
}
f `
\

`;

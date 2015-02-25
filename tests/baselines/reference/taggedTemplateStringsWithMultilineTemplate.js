//// [taggedTemplateStringsWithMultilineTemplate.ts]
function f(...args: any[]): void {
}

f `
\

`;

//// [taggedTemplateStringsWithMultilineTemplate.js]
function f() {
}
(_a = ["\n\n"], _a.raw = ["\n\\\n\n"], f(_a));
var _a;

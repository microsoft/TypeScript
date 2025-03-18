//// [tests/cases/compiler/templateLiteralsInTypes.ts] ////

//// [templateLiteralsInTypes.ts]
const f = (hdr: string, val: number) => `${hdr}:\t${val}\r\n` as `${string}:\t${number}\r\n`;

f("x").foo;


//// [templateLiteralsInTypes.js]
const f = (hdr, val) => `${hdr}:\t${val}\r\n`;
f("x").foo;

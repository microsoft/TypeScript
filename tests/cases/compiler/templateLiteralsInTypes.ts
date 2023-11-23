// @strict: true
// @declaration: true
// @isolatedDeclarationFixedDiffReason: Sourcemap is more detailed

const f = (hdr: string, val: number) => `${hdr}:\t${val}\r\n` as `${string}:\t${number}\r\n`;

f("x").foo;

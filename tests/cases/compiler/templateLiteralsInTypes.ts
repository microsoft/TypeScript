// @strict: true
// @declaration: true

const f = (hdr: string, val: number) => `${hdr}:\t${val}\r\n` as `${string}:\t${number}\r\n`;

f("x").foo;

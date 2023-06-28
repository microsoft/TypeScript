// @target: es5, esnext

let a: string;
declare let obj: { [s: string]: string };

for ([a] in obj) {}

// @target: es5, esnext

let b: number;
let c: string[];
declare let obj: { [s: string]: string };

for ([b, ...c] in obj) {}

// @target: es2018

const test = Object.assign({}, { test: true });

declare const p: Promise<number>;
p.finally();
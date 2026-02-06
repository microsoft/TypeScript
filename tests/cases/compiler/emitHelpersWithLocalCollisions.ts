// @target: es6
// @module: *
// @experimentalDecorators: true
// @filename: a.ts
// @noTypesAndSymbols: true
declare var dec: any, __decorate: any;
@dec export class A {
}

const o = { a: 1 };
const y = { ...o };

// @target: esnext, es2022, es2015, es5
// @noEmitHelpers: true
// @noTypesAndSymbols: true

// @filename: a.ts
declare let dec: any;

@dec class C {}

export {}

// @filename: b.ts
declare let dec: any;

@dec export class C {}

// @filename: c.ts
declare let dec: any;

@dec export default class C {}

// @filename: c.ts
declare let dec: any;

@dec export default class {}

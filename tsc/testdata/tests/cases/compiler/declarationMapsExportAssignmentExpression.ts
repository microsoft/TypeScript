// @module: commonjs
// @declaration: true
// @declarationMap: true

// @filename: exportDefault.ts
const b = 1;
const d = 2;
export default { b, d };

// @filename: exportEquals.ts
const a = 1;
export = { a };

// @filename: exportEqualsClass.ts
export = class {
    x = 1;
};

// @filename: exportDefaultArrow.ts
export default (x: number) => x;

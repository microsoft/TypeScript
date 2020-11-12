// @importHelpers: true
// @module: es2015
// @target: es5
// @downlevelIteration: true
// @filename: a.ts
const a = [1, 2];
const b = [3, 4]
export const c = [...a, ...b];

// @filename: tslib.d.ts
export declare function __read(o: any, n?: number): any[];
export declare function __spread(...args: any[][]): any[];
// @module: commonjs

// @filename: file1.d.ts
declare var x: number;
declare var x1: number;

// @filename: file2.ts
export {x, x as y};
export {x1, x1 as y1};

export {x as z};
export {x1 as z1};
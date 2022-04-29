// @module: commonjs

// @filename: file1.d.ts
declare var x: number;
declare var x1: number;
declare let {a, b}: {a: number, b: number};

// @filename: file2.ts
export {x, x as y};
export {x1, x1 as y1};

export {a, a as a1};
export {b, b as b1};


export {x as z};
export {x1 as z1};
export {a as a2};
export {b as b2};

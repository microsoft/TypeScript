// @declaration: true
// @module: commonjs

// @filename: a.d.ts
declare class X { }

// @filename: b.ts
export {X};
export function f() {
    var x: X;
    return x;
} 

// @module: commonjs

// @filename: file1.d.ts
declare interface I1 {
    x: number
}

declare interface I2 {
    x: number
}

// @filename: file2.ts
export {I1, I1 as II1};
export {I2, I2 as II2};
export {I1 as III1};
export {I2 as III2};
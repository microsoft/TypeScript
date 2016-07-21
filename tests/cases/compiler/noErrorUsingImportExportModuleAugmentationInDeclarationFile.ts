// @module: none
// @filename: 0.d.ts

export = a; //  error TS1148: Cannot use imports, exports, or module augmentations when '--module' is 'none'.
declare var a: number;
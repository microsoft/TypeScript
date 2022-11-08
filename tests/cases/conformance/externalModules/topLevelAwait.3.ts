// @target: esnext
// @module: es2022,esnext
// @filename: index.d.ts

// await keyword allowed as identifier in a declaration file
export {};
declare const await: any;
declare class C extends await {}

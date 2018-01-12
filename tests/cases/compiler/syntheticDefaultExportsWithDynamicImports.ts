// @module: system
// @target: es6
// @moduleResolution: node
// @filename: node_modules/package/index.d.ts
declare function packageExport(x: number): string;
export = packageExport;

// @filename: index.ts
import("package").then(({default: foo}) => foo(42));
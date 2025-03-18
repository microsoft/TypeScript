//// [tests/cases/compiler/syntheticDefaultExportsWithDynamicImports.ts] ////

//// [index.d.ts]
declare function packageExport(x: number): string;
export = packageExport;

//// [index.ts]
import("package").then(({default: foo}) => foo(42));

//// [index.js]
Promise.resolve().then(() => require("package")).then(({ default: foo }) => foo(42));

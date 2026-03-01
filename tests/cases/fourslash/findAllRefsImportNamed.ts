/// <reference path='fourslash.ts' />

// @module: commonjs

// @Filename: f.ts
////export { foo as foo }
////function /*start*/foo(a: number, b: number) { }

// @Filename: b.ts
////import x = require("./f");
////x.foo(1, 2);

verify.noErrors();
verify.baselineFindAllReferences('start')

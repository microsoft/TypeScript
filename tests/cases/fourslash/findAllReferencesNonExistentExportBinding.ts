/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @filename: /bar.ts
////import { Foo/**/ } from "./foo";

// @filename: /foo.ts
////export { Foo }

verify.baselineFindAllReferences('');

/// <reference path='../fourslash.ts' />

// @Filename: /lib/tsconfig.json
//// {}

// @Filename: /lib/index.ts
//// const unrelatedLocalVariable = 123;
//// export const someExportedVariable = unrelatedLocalVariable;

// @Filename: /src/tsconfig.json
//// {}

// @Filename: /src/index.ts
//// import * as /*i*/lib from '../lib/index';
//// lib.someExportedVariable;

// @Filename: /tsconfig.json
//// {}

goTo.file("/lib/index.ts");
goTo.file("/src/index.ts");
verify.baselineRename("i", {});

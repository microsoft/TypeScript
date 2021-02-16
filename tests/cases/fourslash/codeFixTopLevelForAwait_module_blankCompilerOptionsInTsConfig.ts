/// <reference path="fourslash.ts" />
// @filename: /dir/a.ts
////declare const p: number[];
////for await (const _ of p);
////export {};
// @filename: /dir/tsconfig.json
////{
////    "compilerOptions": {
////    }
////}


// Cannot fix module when default module option is `commonjs`...
verify.not.codeFixAvailable("fixModuleOption");

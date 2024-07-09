/// <reference path="fourslash.ts" />
// @filename: /dir/a.ts
////declare const p: Promise<number>;
////await p;
////export {};
// @filename: /dir/tsconfig.json
////{
////    "compilerOptions": {
////    }
////}


// Cannot fix module when default module option is `commonjs`...
verify.not.codeFixAvailable("fixModuleOption");

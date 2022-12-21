/// <reference path="fourslash.ts" />
// @filename: /dir/a.ts
////declare const p: Promise<number>;
////await p;
////export {};
// @filename: /dir/tsconfig.json
////{
////    "compilerOptions": {
////        "target": "es2017",
////        "module": "esnext"
////    }
////}


verify.not.codeFixAvailable("fixModuleOption");

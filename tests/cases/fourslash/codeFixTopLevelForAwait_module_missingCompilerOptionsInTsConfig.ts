/// <reference path="fourslash.ts" />
// @filename: /dir/a.ts
////declare const p: number[];
////for await (const _ of p);
////export {};
// @filename: /dir/tsconfig.json
////{
////}

// cannot fix module when default options are applied
verify.not.codeFixAvailable("fixModuleOption");

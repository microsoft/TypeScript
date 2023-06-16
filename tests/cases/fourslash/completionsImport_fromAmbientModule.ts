/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /a.ts
////declare module "m" {
////    export const x: number;
////    export {x as "x ", x as break, x as await, x as unique};
////}

// @Filename: /b.ts
/////**/

verify.baselineCompletions();

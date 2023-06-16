/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /bar.ts
////export {};
////declare module "./a" {
////    export const bar = 0;
////    export { bar as "Bar non ident", bar as break, bar as await, bar as unique }
////}

// @Filename: /user.ts
/////**/

verify.baselineCompletions();

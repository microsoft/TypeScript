/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: a.d.ts
//// declare namespace foo { class Bar {} }
//// declare module 'path1' {
////   import Bar = foo.Bar;
////   export { Bar as "Bar non ident", Bar as await, Bar as break, Bar as unique };
////   export default Bar;
//// }
//// declare module 'path2longer' {
////   import Bar = foo.Bar;
////   export { Bar as "Bar non ident", Bar as await, Bar as break, Bar as unique };
//// }
////

// @Filename: b.ts
//// Ba/*1*/

verify.baselineCompletions();
